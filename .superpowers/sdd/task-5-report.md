# Task 5 report

## 実装

- `README.md` を初回利用者向けに全面更新し、指定された見出し順へそろえた
- `AGENTS.md` の構造とコマンドをテンプレートの現行構成へ合わせた
- `.github/copilot-instructions.md` に Node.js 22 以上、`npm run check`、`package-lock.json` と `uv.lock` の運用方針を追記した
- GitHub repository metadata をテンプレート運用向けの値へ更新した

## 実行コマンドと結果

### 1. 要件確認

```bash
view .superpowers/sdd/task-5-brief.md
view .github/skills/zenn-writing-style/SKILL.md
view .github/instructions/markdown.instructions.md
```

結果:

- brief の見出し順、必須文言、commit subject、`gh repo edit` 条件を確認
- 正本が `.github/skills/zenn-writing-style/SKILL.md` であることを再確認

### 2. README / AGENTS / reference checks

```bash
python3 - <<'PY'
from pathlib import Path
root = Path('.')
readme = (root/'README.md').read_text()
agents = (root/'AGENTS.md').read_text()
copilot = (root/'.github/copilot-instructions.md').read_text()
required_order = [
    '# zenn-copilot-template',
    '概要',
    '## 特徴',
    '## 前提',
    '## 使い方',
    '### テンプレートから作成する',
    '### テーマを設定する',
    '### 記事を書く',
    '### 公開前に確認する',
    '## Copilot カスタマイズ',
    '## ディレクトリ構成',
    '## コマンド',
    '## 自動検証',
    '## 執筆方針',
    '## ライセンス',
]
pos = -1
for token in required_order:
    new_pos = readme.find(token, pos + 1)
    if new_pos == -1:
        raise SystemExit(f'README missing or out of order: {token}')
    pos = new_pos
for token in ['Node.js 22 以上', 'npm install', 'npm run new:article', 'npm run preview', 'npm run check', 'articles/', 'books/', 'images/', 'scripts/', '.github/', 'Zenn ライター', 'Zenn レビューア', 'ファクトチェッカー', '/fix-ai-style', '/full-review', '/sns-post', '.github/skills/zenn-writing-style/SKILL.md', '[MIT](./LICENSE)']:
    if token not in readme:
        raise SystemExit(f'README missing required token: {token}')
for token in ['articles/        Zenn 記事', 'books/           Zenn 本', 'images/          記事用画像', 'scripts/         検証スクリプト', '.github/         Copilot customizations と CI', 'npm run new:article', 'npm run new:book', 'npm run preview', 'npm run check']:
    if token not in agents:
        raise SystemExit(f'AGENTS missing required token: {token}')
for token in ['Node.js 22 以上', 'npm run check', 'package-lock.json', 'uv.lock', 'uv（pip は使わない）']:
    if token not in copilot:
        raise SystemExit(f'copilot instructions missing required token: {token}')
print('README/AGENTS/reference checks: OK')
PY
```

結果:

```text
README/AGENTS/reference checks: OK
```

### 3. カスタマイズと Zenn の検証

```bash
npm run check
```

結果:

```text
> zenn-copilot-template@1.0.0 check
> npm run check:customizations && npm run check:zenn

> zenn-copilot-template@1.0.0 check:customizations
> node scripts/validate-customizations.mjs

customizations OK: 8 frontmatter files, 13 required canonical headings

> zenn-copilot-template@1.0.0 check:zenn
> npm run list:articles && npm run list:books

> zenn-copilot-template@1.0.0 list:articles
> zenn list:articles

No articles yet

> zenn-copilot-template@1.0.0 list:books
> zenn list:books

No books yet
```

### 4. metadata 更新前の確認

```bash
gh repo view naoki1213mj/zenn-copilot-template \
  --json isTemplate,deleteBranchOnMerge,description,hasIssuesEnabled,hasWikiEnabled,hasProjectsEnabled
```

結果:

```json
{"deleteBranchOnMerge":false,"description":"GitHub Copilot のカスタム命令セット付き Zenn 技術記事テンプレート。AI 文体排除・ファクトチェック・レビューの仕組み入り。","hasIssuesEnabled":true,"hasProjectsEnabled":true,"hasWikiEnabled":true,"isTemplate":false}
```

### 5. documentation commit

```bash
git add README.md AGENTS.md .github/copilot-instructions.md
git commit -m "docs: refresh template onboarding" \
  -m "Co-authored-by: Copilot App <223556219+Copilot@users.noreply.github.com>" \
  -m "Copilot-Session: f465afc6-f422-43b4-8b14-865217c9774a" \
  -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
```

結果:

```text
[naoki1213mj-update-zenn-writing-style 1cf4c3f] docs: refresh template onboarding
 3 files changed, 87 insertions(+), 63 deletions(-)
```

### 6. GitHub repository metadata 更新と確認

```bash
gh repo edit naoki1213mj/zenn-copilot-template \
  --template \
  --delete-branch-on-merge \
  --description "GitHub Copilot 向け Zenn 技術記事テンプレート。根拠・再現性・真正性を保ちながら執筆、レビュー、ファクトチェックを支援。"

gh repo view naoki1213mj/zenn-copilot-template \
  --json isTemplate,deleteBranchOnMerge,description

gh repo view naoki1213mj/zenn-copilot-template \
  --json hasIssuesEnabled,hasWikiEnabled,hasProjectsEnabled
```

結果:

```json
{"deleteBranchOnMerge":true,"description":"GitHub Copilot 向け Zenn 技術記事テンプレート。根拠・再現性・真正性を保ちながら執筆、レビュー、ファクトチェックを支援。","isTemplate":true}
```

```json
{"hasIssuesEnabled":true,"hasProjectsEnabled":true,"hasWikiEnabled":true}
```

## 変更ファイル

- `README.md`
- `AGENTS.md`
- `.github/copilot-instructions.md`
- `.superpowers/sdd/task-5-report.md`

## repository metadata の before / after

| 項目 | before | after |
| --- | --- | --- |
| `isTemplate` | `false` | `true` |
| `deleteBranchOnMerge` | `false` | `true` |
| `description` | `GitHub Copilot のカスタム命令セット付き Zenn 技術記事テンプレート。AI 文体排除・ファクトチェック・レビューの仕組み入り。` | `GitHub Copilot 向け Zenn 技術記事テンプレート。根拠・再現性・真正性を保ちながら執筆、レビュー、ファクトチェックを支援。` |
| `hasIssuesEnabled` | `true` | `true` |
| `hasWikiEnabled` | `true` | `true` |
| `hasProjectsEnabled` | `true` | `true` |

## セルフレビュー

- README の見出し順と必須文言は reference check で確認した
- `npm run check` が通る状態まで README の SKILL 参照位置を調整した
- `AGENTS.md` は品質基準と禁止事項を残したまま、構造とコマンドだけを同期した
- `.github/copilot-instructions.md` は正本の要約に留め、詳細ルールの重複を増やしていない

## 懸念

- なし
