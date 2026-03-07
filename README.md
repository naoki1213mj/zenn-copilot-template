# zenn-copilot-template

GitHub Copilot のカスタム命令セット付き Zenn 技術記事テンプレート。

AI 文体を排除し、現場エンジニアの個人ブログトーンで記事を書くための仕組みが入っています。

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
- **Zenn ライター** — 執筆・文体改善
- **Zenn レビューア** — 公開前レビュー（スコアカード付き）
- **ファクトチェッカー** — 公式ドキュメントとの照合

Prompt から:
- `/fix-ai-style` — AI 文体の検出・除去
- `/full-review` — フルレビュー
- `/sns-post` — SNS 投稿文の生成

## 含まれるカスタム命令

```
.github/
├── copilot-instructions.md        # 全リクエストに適用（文体・コード規約）
├── instructions/
│   └── markdown.instructions.md   # articles/*.md に自動適用（Zenn 記法）
├── agents/
│   ├── zenn-writer.agent.md       # 執筆・編集エージェント
│   ├── zenn-reviewer.agent.md     # レビューエージェント（handoff 付き）
│   └── factchecker.agent.md       # ファクトチェックエージェント
├── prompts/
│   ├── fix-ai-style.prompt.md     # AI 文体除去
│   ├── full-review.prompt.md      # フルレビュー
│   └── sns-post.prompt.md         # SNS 投稿文生成
└── skills/
    ├── zenn-factcheck/             # ファクトチェック手順
    ├── zenn-writing-style/         # AI 文体排除の詳細ガイド
    └── zenn-article-review/        # 記事レビュー手順
```

## AI 文体排除の 6 パターン

このテンプレートが検出・排除する AI っぽい文体:

1. **記号残り** — `**太字**` が地の文に残る、「—」で言い換え
2. **リズム単調** — 同じ語尾 3 回以上、接続詞だらけ
3. **説明書口調** — 「以下の3つの観点から」、ステップ形式
4. **事なかれ主義** — 「ケースバイケースです」で逃げる
5. **抽象語空回り** — 「本質」「最適化」根拠なき強評価
6. **定番比喩** — 羅針盤、設計図、両輪、潤滑油

## ライセンス

MIT
