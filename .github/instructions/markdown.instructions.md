---
name: Zenn 記事 Markdown ルール
description: Zenn 技術記事の Markdown 記法・文体ルール。articles/ 配下の .md ファイル編集時に自動適用。
applyTo: "articles/**/*.md"
---

# Zenn 記事 Markdown ルール

記事に関わる作業では `.github/skills/zenn-writing-style/SKILL.md`（統合スキル）を必ず参照すること。

## Zenn 記法

- Zenn 記法準拠（https://zenn.dev/zenn/articles/markdown-guide）
- フロントマター必須: title（70 字以内）, emoji, type, topics, published
- 見出しは H2 から。H1 は使わない
- 見出しにコロンを使わない（`## 概要：全体像` → `## 概要`）
- `:::message` / `:::message alert` / `:::details タイトル` は `:::` で閉じる
- コードブロックには言語指定 + ファイル名ラベル（````python:src/main.py```）
- Mermaid: subgraph ID は英数字のみ、ノードラベルに絵文字なし、分岐ラベルは半角英字
- bare URL 単独行 → リンクカード表示。markdownlint MD034 が出るので `<!-- markdownlint-disable MD034 -->` で囲む
- 画像は `/images/` 配下、相対パス、出典キャプション必須
- 公式ドキュメントの図は SVG 取得 → `rsvg-convert -w 1600 input.svg -o output.png` で変換
- Mermaid は Zenn で動く構文のみ
- 外部 URL は生存確認済みにする

## 構造

- 6 点以上の連続箇条書き → 文章に書き直す。5 点以内に収める
- `- **見出し**: 説明` のインラインヘッダー付き箇条書き → 文に統合か見出しに昇格
- 体言止め禁止（述語を付ける）
- `**非常に** **重要な**` 等の過剰 bold → 自然な強調に
- 「まとめ」セクション → 「おわりに」で次にやりたいことを書く
- 「ここでは〜について解説します」で始めない。「今後の展開が注目」で終わらない

## 文体

- AI 文体 10 パターンを排除すること（統合スキルのセクション 1 参照）
- 敬体ベースにくだけた口語を混ぜる
- 主観・試行錯誤を入れる
