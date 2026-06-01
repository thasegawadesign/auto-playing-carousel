# auto-playing-carousel

整備・メンテナンス業向けランディングのヒーロー領域を想定した、**自動再生フェードカルーセル**の Next.js プロトタイプです。

## 機能

- フルスクリーンのヒーローカルーセル（フェード切替・10 秒間隔の自動送り）
- 再生 / 一時停止（円形プログレス付きボタン）
- ドットナビ・前後矢印（モバイル / デスクトップで配置を切り替え）
- スライドごとの見出し・サブコピー・CTA
- サイトヘッダー（ロゴ・ナビ・お問い合わせ・メニューボタン）
- `prefers-reduced-motion` 時は自動送りとアニメーションを無効化

## 技術スタック

| 項目 | 内容 |
|------|------|
| フレームワーク | [Next.js](https://nextjs.org/) 16（App Router） |
| UI | React 19、Tailwind CSS v4 |
| パッケージマネージャ | [pnpm](https://pnpm.io/) 11 |
| フォーマット / Lint | [oxfmt](https://oxc.rs/docs/guide/usage/formatter.html)、[oxlint](https://oxc.rs/docs/guide/usage/linter.html) |
| クラス結合 | `cn`（`clsx` + `tailwind-merge`） |

## 必要条件

- Node.js 22 以上（推奨）
- Corepack 有効化（`pnpm` は `package.json` の `packageManager` で固定）

## セットアップ

```bash
corepack enable
pnpm install
pnpm dev
```

[http://localhost:3000](http://localhost:3000) を開いて表示を確認します。

## スクリプト

| コマンド | 説明 |
|----------|------|
| `pnpm dev` | 開発サーバー起動 |
| `pnpm build` | 本番ビルド |
| `pnpm start` | 本番サーバー起動 |
| `pnpm format` | oxfmt で整形（Tailwind クラスソート含む） |
| `pnpm format:check` | フォーマット差分のチェック |
| `pnpm lint` | oxlint |
| `pnpm lint:fix` | oxlint の自動修正 |
| `pnpm typecheck` | TypeScript の型チェック |
| `pnpm check` | `format:check` + `lint` + `typecheck` |

PR 前やコミット前の確認:

```bash
pnpm check && pnpm build
```

## プロジェクト構成

```
src/
├── app/
│   ├── globals.css      # テーマ色・アニメーション
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── carousel-playback-button.tsx  # 再生 / 一時停止
│   ├── hero-carousel.tsx             # ヒーロー本体
│   ├── icons.tsx
│   ├── menu-button.tsx
│   └── site-header.tsx
└── lib/
    ├── carousel-slides.ts  # スライド・ナビ・間隔の定義
    └── utils.ts              # cn
public/
├── logo.png
└── photo1–3.avif           # ヒーロー背景画像
```

## カスタマイズ

### スライドと自動送り間隔

`src/lib/carousel-slides.ts` を編集します。

- `CAROUSEL_SLIDES` — 画像パス、`alt`、見出し行、サブコピー
- `CAROUSEL_INTERVAL_MS` — 自動送りの間隔（ミリ秒、既定は `10000`）
- `SITE_NAV_LINKS` — ヘッダーナビのラベルとリンク

画像は `public/` に置き、`src` をパス（例: `/photo4.avif`）で指定します。

### テーマカラー

`src/app/globals.css` の `:root` と `@theme inline` で primary / secondary などを変更します。

## エディタ（VS Code / Cursor）

推奨拡張機能は `.vscode/extensions.json` を参照してください。

- **Oxc** — 保存時フォーマット（oxfmt）と oxlint 修正
- **Tailwind CSS IntelliSense** — クラス補完

`.vscode/settings.json` で保存時フォーマットと oxlint 修正が有効です。oxfmt は `cn` / `clsx` 内の Tailwind クラスもソートします（`.oxfmtrc.json` の `sortTailwindcss`）。

## ライセンス

プライベートプロトタイプ（`package.json` の `"private": true`）。
