---
name: Zenn 記事 Markdown ルール
description: Zenn 技術記事の Markdown 記法・文体ルール。articles/ 配下の .md ファイル編集時に自動適用。
applyTo: "articles/**/*.md"
---

# Zenn 記事 Markdown ルール

- Zenn 記法準拠（https://zenn.dev/zenn/articles/markdown-guide）
- フロントマター必須: title, emoji, type, topics, published
- title は 70 字以内（Zenn の制限）
- コードブロックには言語指定する
- 見出しは H2 から。H1 は使わない
- 見出しにコロンを使わない
- `:::message` `:::details` は `:::` で閉じる
- Mermaid は Zenn で動く構文のみ（後述の互換性ルール参照）
- 画像は `/images/` 配下、相対パスで参照
- 外部 URL は生存確認済みにする
- 公式ドキュメント等への bare URL を単独行に置くと Zenn がリンクカードとして描画する。markdownlint の MD034 警告が出るため `<!-- markdownlint-disable MD034 -->` / `<!-- markdownlint-enable MD034 -->` で囲む
- 冒頭に参照時点の `:::message` を置く（例: 「本記事は YYYY 年 M 月 D 日時点の公式ドキュメントをもとにしています」）
- 記事末尾に `:::details 免責事項` を置く

## Mermaid 互換性ルール（Zenn 固有）

Zenn の Mermaid レンダリングには制約がある。以下を守らないと図が崩れるか表示されない。

- subgraph の ID は英数字のみ（`S1`, `Phase1` など）。日本語やスペースを含む ID は使わない
- ノードラベルに絵文字を入れない。レンダリングが崩れる原因になる
- ラベルは短く、日本語 OK だが Unicode 記号は避ける
- `Yes` / `No` の分岐ラベルは半角英字が安全
- 複雑な図は Mermaid より画像にしたほうが確実

## 画像の扱い

- 公式ドキュメントの図は SVG で取得し、PNG に変換して `/images/` 配下に置く
- 変換コマンド例: `rsvg-convert -w 1600 input.svg -o output.png`
- `rsvg-convert` が未インストールの場合: `brew install librsvg`（Mac）
- 出典キャプションを必ずつける（例: `*出典: [ページ名 - Microsoft Learn](URL)*`）
- スクリーンショットは解像度やクロップの問題が出やすいため、SVG 直接取得 → PNG 変換を優先する
