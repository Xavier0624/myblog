# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (Turbopack)
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint
```

## Architecture

个人博客，Next.js 16 App Router + TypeScript + Tailwind CSS v4。文章以 Markdown 文件存储，构建时读取渲染为静态页面。

### Content flow

```
content/posts/*.md  →  src/lib/posts.ts  →  页面组件
     (Markdown)         (gray-matter 解析)      (SSG)
```

- **`content/posts/`** — Markdown 文章，文件名即 slug（如 `hello-world.md` → `/posts/hello-world`）
- **`src/lib/posts.ts`** — `getAllPosts()` 和 `getPostBySlug(slug)`，使用 `gray-matter` 解析 frontmatter
- Frontmatter 字段：`title`, `date`, `excerpt`

### Pages

- **`src/app/page.tsx`** — 首页，列出所有文章（按日期倒序）
- **`src/app/posts/[slug]/page.tsx`** — 文章详情页，`generateStaticParams()` 预生成所有路径
- **`src/app/about/page.tsx`** — 关于页面（头像、姓名、简介、社交链接）
- **`src/app/layout.tsx`** — 根布局（Header + Footer + 全局字体 Geist）

### Components

- `Header` / `Footer` — 全局导航
- `PostCard` — 首页文章卡片（标题、日期、摘要）
- `PostContent` — Markdown 渲染（react-markdown + remark-gfm）

### Styling

Tailwind CSS v4 使用 CSS 配置（`@theme inline` 在 `globals.css` 中），无 `tailwind.config.ts`。`@plugin "@tailwindcss/typography"` 提供文章排版样式（`.prose`）。

## Key patterns

- Next.js 16 中 `params` 是 `Promise`，需 `await params` 解构
- `generateStaticParams()` 返回 `{ slug }[]` 用于 SSG
- 文章读取使用同步 `fs` API（构建时运行，无需异步）
- 文章未找到时调用 `notFound()` 触发 404

## Next.js version notes

This is Next.js 16.2.6 — APIs and conventions may differ from training data. Check `node_modules/next/dist/docs/` for current docs before using unfamiliar APIs.
