To-Mdのリンク : [To-Md](https://to-md.vercel.app/)

<div id="top"></div>

## 使用技術一覧

1. Next.js (App Router) -Web開発向けのReact フレームワーク
2. Tailwind CSS - CSS ユーティリティフレームワーク
3. Google Fonts - パフォーマンス重視のフォント管理
5. TypeScript - 静的型付けを付与したJavaScriptのスーパーセット
7. Block Note - オープンソースのブロックベースのリッチテキストエディタ
8. supabase - Firebaseのオープンソース代替として開発されたバックエンドサービス
9. shadcn/ui - コンポーネントライブラリ

※詳細はpackage.jsonをご参照ください

## 目次

1. [プロジェクトについて](#プロジェクトについて)
2. [環境](#環境)
3. [ディレクトリ構成](#ディレクトリ構成)
4. [開発環境構築](#開発環境構築)

<!-- プロジェクトについて -->

## プロジェクトについて

### Next.jsとBlockNoteを用いて開発したリッチテキスト→Markdown変換ツールです。
- BlockNoteが提供するNotionライクなリッチエディタで快適に記事を作成できます。
- 作成した記事は、BlockNote標準のMarkdown変換機能を利用して、QiitaやZennなどの技術投稿メディア向けにMarkdown形式で出力できます。
- Supabaseと連携して画像アップロード機能を追加実装しました。

### なぜこのアプリケーションを作成したのか
私はエンジニアとして成長するために積極的に技術情報を発信し、多くのフィードバックを得たいと考えています。
普段よく利用するQiitaやZennなどの技術投稿メディアは、記事の作成にMarkdownを使用します。
しかし、Markdownのみの執筆環境よりも、Notionのような直感的でリッチなエディタで記事を作成できたら、より効率的かつ快適に技術発信ができると考え、このアプリケーションを開発しました。。

### 工夫したこと

BlockNoteは、ヘッダーやリスト、表など基本的なMarkdown変換には標準対応していますが、埋め込みリンクや画像アップロードなど一部の機能については、自分でAPIの設定や追加実装を行う必要がありました。
そのため、埋め込みリンクの挿入機能や、Supabaseを用いた画像アップロード機能を独自に実装することで、技術記事作成に必要な機能を網羅しました。
これにより、作成した記事をQiitaやZennにスムーズに投稿できるようなMarkdown形式で出力できるようになっています。

## 環境

<!-- 言語、フレームワーク、ミドルウェア、インフラの一覧とバージョンを記載 -->

| 言語・フレームワーク | バージョン    |
| -------------------- | ------------- |
| React                | 19.0.0        |
| React DOM            | 19.0.0        |
| Next.js              | 15.2.3        |
| BlockNote            | 0.26.0        |
| Supabase             | 2.49.1        |
| Tailwind CSS         | 4.x           |
| ESLint               | 9.x           |
| TypeScript           | 5.x           |
| Node.js              | 20.x          |
| Zod                  | 3.24.2        |
| Prettier             | 3.5.3         |

その他のパッケージのバージョンは package.json を参照してください

<p align="right">(<a href="#top">トップへ</a>)</p>

## ディレクトリ構成

<!-- Treeコマンドを使ってディレクトリ構成を記載 -->

src 以下のディレクトリ構成

<pre>
└─src
    ├─app
    │  └─api
    │      ├─cleanup
    │      ├─embed
    │      └─upload
    ├─components
    │  ├─editor
    │  ├─embed-link-block
    │  ├─header
    │  └─ui
    ├─config
    ├─context
    ├─fonts
    ├─lib
    ├─styles
    └─types
</pre>

---



---

## 🔧 セットアップ方法

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd <repository-directory>


```

### 2. 開発環境構築

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

[http://localhost:3000]を開く
