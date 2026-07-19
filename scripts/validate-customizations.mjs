import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const contents = new Map();
const formatList = (values) => `[${values.map((value) => `'${value}'`).join(', ')}]`;

const workspacePath = (relativePath) => resolve(root, relativePath);
const read = (relativePath) => {
  if (contents.has(relativePath)) return contents.get(relativePath);
  if (!existsSync(workspacePath(relativePath))) {
    errors.push(`missing required file: ${relativePath}`);
    contents.set(relativePath, null);
    return null;
  }
  const text = readFileSync(workspacePath(relativePath), 'utf8').replace(
    /\r\n?/g,
    '\n',
  );
  contents.set(relativePath, text);
  return text;
};

const frontmatterFiles = [
  '.github/skills/zenn-writing-style/SKILL.md',
  '.github/instructions/markdown.instructions.md',
  '.github/agents/zenn-writer.agent.md',
  '.github/agents/zenn-reviewer.agent.md',
  '.github/agents/factchecker.agent.md',
  '.github/prompts/fix-ai-style.prompt.md',
  '.github/prompts/full-review.prompt.md',
  '.github/prompts/sns-post.prompt.md',
];

const expectedToolsByFile = new Map([
  ['.github/agents/zenn-writer.agent.md', ['edit', 'search', 'shell']],
  ['.github/agents/zenn-reviewer.agent.md', ['search', 'shell', 'web/fetch']],
  ['.github/agents/factchecker.agent.md', ['search', 'shell', 'web/fetch']],
  ['.github/prompts/fix-ai-style.prompt.md', ['edit', 'search']],
  ['.github/prompts/full-review.prompt.md', ['search', 'shell', 'web/fetch']],
  ['.github/prompts/sns-post.prompt.md', ['search']],
]);

const downstreamFiles = [
  '.github/copilot-instructions.md',
  '.github/instructions/markdown.instructions.md',
  '.github/agents/zenn-writer.agent.md',
  '.github/agents/zenn-reviewer.agent.md',
  '.github/agents/factchecker.agent.md',
  '.github/prompts/fix-ai-style.prompt.md',
  '.github/prompts/full-review.prompt.md',
  '.github/prompts/sns-post.prompt.md',
  'AGENTS.md',
  'README.md',
];

for (const relativePath of frontmatterFiles) {
  const text = read(relativePath);
  if (text === null) continue;
  if (!text.startsWith('---\n') || text.indexOf('\n---\n', 4) < 0) {
    errors.push(`${relativePath}: invalid frontmatter boundary`);
  }
}

const skill = read('.github/skills/zenn-writing-style/SKILL.md');
const headings = new Set(
  [...(skill?.matchAll(/^#{2,3}\s+(.+)$/gm) ?? [])].map((match) =>
    match[1].trim(),
  ),
);
const requiredHeadings = [
  '使い方',
  '文章の根拠',
  'AI 文体十パターン',
  '人の声を残す',
  '構成と情報密度',
  '読者が再現できる説明',
  'Zenn 記法と図版',
  'ファクトチェック',
  'SNS 投稿文',
  'レビューワークフロー',
  '六観点スコアカード',
  'NG と改善例',
  '参考文献',
];

if (skill !== null) {
  for (const heading of requiredHeadings) {
    if (!headings.has(heading)) {
      errors.push(`canonical skill: missing heading "${heading}"`);
    }
  }
}

for (const relativePath of downstreamFiles) {
  const text = read(relativePath);
  if (text === null) continue;
  const lines = text.split('\n');
  for (let index = 0; index < lines.length; index += 1) {
    if (!lines[index].includes('SKILL.md')) continue;
    const block = [lines[index]];
    let lookahead = index + 1;
    while (lookahead < lines.length && lines[lookahead].trim() !== '') {
      block.push(lines[lookahead]);
      lookahead += 1;
    }
    const blockText = block.join('\n');
    const references = [
      ...[...blockText.matchAll(/`([^`]+)`/g)]
        .map((match) => match[1])
        .filter((value) => headings.has(value)),
      ...[...blockText.matchAll(/「([^」]+)」/g)].map((match) => match[1]),
    ].filter((value) => !value.endsWith('.md') && !value.includes('/'));
    for (const reference of references) {
      if (!headings.has(reference)) {
        errors.push(
          `${relativePath}: unknown canonical heading "${reference}"`,
        );
      }
    }
    index = lookahead - 1;
  }
}

for (const [relativePath, expectedTools] of expectedToolsByFile) {
  const text = read(relativePath);
  if (text === null) continue;
  const frontmatterEnd = text.indexOf('\n---\n', 4);
  const frontmatter = text.slice(4, frontmatterEnd);
  const toolsLine = frontmatter.match(/^tools:\s*\[(.+)\]\s*$/m);
  if (!toolsLine) {
    errors.push(`${relativePath}: missing tools list`);
    continue;
  }
  const actualTools = [...toolsLine[1].matchAll(/['"]([^'"]+)['"]/g)].map(
    (match) => match[1],
  );
  const matchesExpected =
    actualTools.length === expectedTools.length &&
    expectedTools.every((tool, index) => actualTools[index] === tool);
  if (!matchesExpected) {
    errors.push(
      `${relativePath}: expected tools ${formatList(expectedTools)}, actual tools ${formatList(actualTools)}`,
    );
  }
}

for (const directory of ['articles', 'books', 'images']) {
  if (!existsSync(workspacePath(directory))) {
    errors.push(`missing required directory: ${directory}`);
  }
}

for (const removedPath of [
  '.vscode',
  '.github/skills/zenn-article-review',
  '.github/skills/zenn-factcheck',
]) {
  if (existsSync(workspacePath(removedPath))) {
    errors.push(`obsolete path still exists: ${removedPath}`);
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `customizations OK: ${frontmatterFiles.length} frontmatter files, ${requiredHeadings.length} required canonical headings`,
);
