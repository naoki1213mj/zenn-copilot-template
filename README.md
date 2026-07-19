# zenn-copilot-template

GitHub Copilot のカスタム命令セット付き Zenn 技術記事テンプレート。

文体の違和感を減らしつつ、根拠の薄い文章や作り話を避けて記事を書くための仕組みをまとめています。

## 使い方

### 1. テンプレートから新しいリポジトリを作る

GitHub で「Use this template」を押すか:

```bash
gh repo create my-zenn-article --template naoki1213mj/zenn-copilot-template --public --clone
cd my-zenn-article
npm install
```

### 2. テーマを設定する

以下のファイルのプレースホルダーを書き換える:
- `.github/copilot-instructions.md` — 「現在のテーマ」とテーマ固有の知見
- `AGENTS.md` — 「テーマ」

### 3. 記事を書き始める

```bash
npx zenn new:article
npx zenn preview
```

### 4. Copilot Agent を活用する

VS Code の Agent ドロップダウンから:
- Zenn ライター — 執筆・文体改善
- Zenn レビューア — 公開前レビュー
- ファクトチェッカー — 公式ドキュメントとの照合

Prompt から:
- `/fix-ai-style` — 文体の違和感を見直す
- `/full-review` — フルレビュー
- `/sns-post` — SNS 投稿文の生成

## 含まれるカスタム命令

詳細ルールは `.github/skills/zenn-writing-style/SKILL.md` にまとめています。`.github/copilot-instructions.md`、`.github/instructions/markdown.instructions.md`、`AGENTS.md` はこの正本を短く参照する役目です。名前付き見出しを見れば、どこを読めばいいか迷いません。

```
.github/
├── copilot-instructions.md        # 全リクエストに適用（執筆方針・コード規約）
├── instructions/
│   └── markdown.instructions.md   # articles/*.md に自動適用（記事編集ルール）
├── agents/
│   ├── zenn-writer.agent.md       # 執筆・編集エージェント
│   ├── zenn-reviewer.agent.md     # 公開前レビューエージェント
│   └── factchecker.agent.md       # ファクトチェックエージェント
├── prompts/
│   ├── fix-ai-style.prompt.md     # 文体レビュー
│   ├── full-review.prompt.md      # フルレビュー
│   └── sns-post.prompt.md         # SNS 投稿文生成
└── skills/
    └── zenn-writing-style/        # 統合スキル
```

## 執筆の流れ

### 執筆前

まず `.github/skills/zenn-writing-style/SKILL.md` の「使い方」と「文章の根拠」を開きます。誰向けの記事かを決めて、公式ドキュメント、リリースノート、実行メモのような一次情報を揃えてから書き始めます。

### 執筆中

事実、実測、推測、私見を混ぜないように書きます。著者本人の材料がない主観や失敗談は足しません。太字、体言止め、箇条書きも無条件に消すのではなく、続きすぎていないかを見ながら整えます。

### 執筆後

仕上げは二段に分けます。先に「AI 文体十パターン」と「構成と情報密度」で文体を見直し、そのあとで「ファクトチェック」と「Zenn 記法と図版」を確認します。文体レビューと事実確認を分けると、禁止語を消しただけの記事で終わりにくくなります。

## この更新で変わったこと

以前のテンプレートは、まず禁止表現を削る方向に寄っていました。今回からはそこを少し改めています。

- 禁止語を消すだけでなく、文章の根拠を確認する
- 著者本人の材料がない主観や失敗談を補わない
- 構成を毎回同じ型に押し込まない
- 文体レビューと事実確認を別工程にする

正直なところ、この方が公開前レビューも楽です。直す理由が言葉の好みではなく、根拠の有無で揃うからです。

## ライセンス

MIT
