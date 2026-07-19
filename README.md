# zenn-copilot-template

概要

GitHub Copilot 向けの Zenn 技術記事テンプレートです。記事の下書き、レビュー、ファクトチェックを同じリポジトリで回しやすくして、根拠と再現性を崩さずに書き進められる形にしています。

## 特徴

- Node.js 22 以上と npm を前提に、Zenn CLI と検証コマンドをそのまま使えます
- Zenn ライター、Zenn レビューア、ファクトチェッカーと 3 つの prompt をすぐ呼び出せます
- `npm run check` で Copilot カスタマイズと Zenn コンテンツの確認をまとめて回せます

- `.github/skills/zenn-writing-style/SKILL.md` を正本にして、文体とファクトチェックの判断を一か所に寄せています

## 前提

- Node.js 22 以上
- npm
- GitHub アカウント
- GitHub Copilot を使う場合は、custom instructions、agents、prompts を読める対応環境

## 使い方

### テンプレートから作成する

GitHub のテンプレート機能を使うか、`gh` から新しいリポジトリを作成します。

```bash
gh repo create my-zenn-article --template naoki1213mj/zenn-copilot-template --public --clone
cd my-zenn-article
npm install
```

### テーマを設定する

最初に次の 2 か所を書き換えます。

- `.github/copilot-instructions.md` の「現在のテーマ」と「テーマ固有の知見」
- `AGENTS.md` の「テーマ」

ここで決めたテーマを基準に、記事本文、レビュー、プロンプトの前提をそろえます。

### 記事を書く

依存関係を入れたあと、記事か本の下書きを作ってプレビューします。

```bash
npm install
npm run new:article
npm run preview
```

本を書く場合は `npm run new:book` を使います。

記事本文を編集するときは、詳細ルールを `.github/skills/zenn-writing-style/SKILL.md` で確認します。

### 公開前に確認する

公開前はローカルで次のコマンドを流します。

```bash
npm run check
```

そのうえで、Zenn レビューアや `/full-review` を使って、文体と事実確認を別々に見直します。

## Copilot カスタマイズ

このテンプレートの詳細ルールは `.github/skills/zenn-writing-style/SKILL.md` が正本です。`.github/copilot-instructions.md`、`AGENTS.md`、`.github/instructions/markdown.instructions.md` は運用の入口だけを短く持たせています。

利用の入口は次のとおりです。

- Zenn ライター `/.github/agents/zenn-writer.agent.md`
- Zenn レビューア `/.github/agents/zenn-reviewer.agent.md`
- ファクトチェッカー `/.github/agents/factchecker.agent.md`
- `/fix-ai-style` `/.github/prompts/fix-ai-style.prompt.md`
- `/full-review` `/.github/prompts/full-review.prompt.md`
- `/sns-post` `/.github/prompts/sns-post.prompt.md`

## ディレクトリ構成

| パス | 役割 |
| --- | --- |
| `articles/` | Zenn 記事の Markdown を置きます |
| `books/` | Zenn 本の原稿を置きます |
| `images/` | 記事や本で使う画像を置きます |
| `scripts/` | 検証スクリプトを置きます |
| `.github/` | Copilot customizations と CI を置きます |

## コマンド

| コマンド | 用途 |
| --- | --- |
| `npm run new:article` | 新しい記事を作ります |
| `npm run new:book` | 新しい本を作ります |
| `npm run preview` | Zenn プレビューを起動します |
| `npm run check` | Copilot カスタマイズと Zenn コンテンツを確認します |

## 自動検証

`npm run check` は `scripts/validate-customizations.mjs` と Zenn の一覧チェックをまとめて流します。GitHub Actions でも同じ系統の確認を回せるので、ローカルと PR で見ているものがずれにくい構成です。依存関係の更新は Dependabot に任せつつ、`package-lock.json` を基準に Node 側の再現性を保ちます。

## 執筆方針

詳しい執筆ルールは `.github/skills/zenn-writing-style/SKILL.md` を見てください。ここで外さないのは次の 3 点です。

- 事実、実測、推測、私見を混ぜない
- 架空の体験、感情、会話、未確認の結果を書かない
- 文体の調整とファクトチェックを同じ作業にしない

## ライセンス

[MIT](./LICENSE)
