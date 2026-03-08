# AGENTS.md

Zenn 技術記事の検証・執筆プロジェクト。

<!-- テーマを記入 -->
テーマ: （ここにテーマを記入）

## 構造

```
articles/        — Zenn 記事 Markdown
scripts/         — 検証スクリプト
images/          — 記事用画像
.github/skills/  — Agent Skills
.github/agents/  — カスタムエージェント
.github/prompts/ — 再利用可能プロンプト
```

## コマンド

```bash
npx zenn preview                   # 記事プレビュー localhost:8000
npx zenn new:article               # 新規記事
```

## 画像ワークフロー

```bash
# SVG を取得して PNG に変換
curl -L "<svg-url>" -o images/<dir>/<name>.svg
rsvg-convert -w 1600 images/<dir>/<name>.svg -o images/<dir>/<name>.png

# rsvg-convert がない場合
brew install librsvg
```

## 品質基準

1. 正確性 → 公式ドキュメントと照合済み
2. 再現性 → コードが動く
3. 文体 → AI 生成感ゼロ
4. Zenn 記法 → フロントマター・メッセージ・Mermaid が正しい

## 禁止事項

- API キーをコードに直書き
- GA/Preview 状態を未確認で記載
- 「包括的に」「網羅的に」「非常に重要」
- 「まとめ」で締める
- 「腰落ち」「要するに」「結論を先に言うと」
- 「羅針盤」「設計図」「両輪」「地図」「迷子」

## ファクトチェック

1. 記事中の製品名・バージョン・API 名を抽出
2. 公式ドキュメント / GitHub Releases / PyPI で照合
3. 食い違いがあれば修正案 + ソース URL を提示
