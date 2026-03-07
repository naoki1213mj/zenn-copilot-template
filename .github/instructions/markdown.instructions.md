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
- Mermaid は Zenn で動く構文のみ
- 画像は `/images/` 配下、相対パスで参照
- 外部 URL は生存確認済みにする
