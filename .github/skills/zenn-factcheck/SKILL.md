---
name: zenn-factcheck
description: 技術記事のファクトチェック。公式ドキュメント・GitHub Releases・PyPI と照合し、製品名・バージョン・GA/Preview 状態・URL の正確性を検証する。「ファクトチェック」「公式と照合」「バージョン確認」「正しいか確認」などのリクエスト時に使用。
---

# ファクトチェック

記事中の技術的事実を一次情報源と照合する。

## 検証カテゴリ

| 対象 | 確認内容 | 一次情報源 |
|------|---------|-----------|
| 製品名 | 正式名称、リブランド | 公式ドキュメント |
| バージョン | SDK/API バージョン、GA/Preview | 公式ドキュメント, GitHub Releases, PyPI |
| コード | エンドポイント、認証方式、パラメータ | SDK リポジトリ |
| 数値 | 価格、制限値、SLA | 公式 Pricing |
| URL | リンク切れ、リダイレクト | curl -sI |

## 手順

### 1. 要検証項目を抽出

記事を通し読みし、検証が必要な箇所をリストにする。

### 2. 一次情報源で検証

```bash
# PyPI
pip index versions <package> 2>/dev/null | head -5

# GitHub
gh release list --repo <owner>/<repo> --limit 5

# URL 生存確認
curl -sI "<url>" | head -5
```

### 3. 結果を報告

```markdown
## ファクトチェック結果

### ✅ 正確
- <product> <version> — <source> 確認済み

### ⚠️ 要修正
| 箇所 | 記事の記述 | 正しい情報 | ソース |
|------|-----------|-----------|--------|
| L42 | xxx | yyy | [公式](url) |

### ❌ 確認不可
- xxx → 公式に記載なし。削除を推奨
```

## 注意

- 検証できない情報は「未確認」と書く。推測しない
- Preview 機能は「202X年X月時点」と日付を添える
