---
title: "Next.js SSG 静态站点生成指南"
date: "2026-05-11"
excerpt: "了解 Next.js 的静态站点生成（SSG）原理，并应用于个人博客开发。"
tags: ["Next.js", "前端", "性能"]
---

## 什么是 SSG

**SSG（Static Site Generation）** 是 Next.js 提供的一种预渲染模式。在构建时（build time）生成静态 HTML 页面，用户请求时直接返回预生成的页面，无需服务端实时渲染。

## 为什么选择 SSG

对于一个内容驱动的博客来说，SSG 是理想选择：

- **极快的加载速度** — 静态文件直接由 CDN 分发
- **优秀的 SEO** — 每个页面都是完整的 HTML
- **低成本** — 无需 Node.js 服务器，托管在任意静态服务即可

## 代码实现

### 生成静态路径

```ts
export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
```

`generateStaticParams` 告诉 Next.js 在构建时需要预生成哪些路径的页面。

### 读取 Markdown 内容

```ts
export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    content,
  };
}
```

使用 `gray-matter` 解析 frontmatter 和 Markdown 正文，`node:fs` 同步 API 在构建时使用没有性能问题。

### 页面组件

```tsx
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <PostContent content={post.content} />
    </article>
  );
}
```

注意 Next.js 16 中 `params` 是 `Promise`，需要用 `await` 解构。

## 构建输出

运行 `next build` 后，你会在输出中看到：

```
├ ● /                    # 静态页面
├ ● /posts/hello-world   # SSG 预渲染
└ ● /posts/ssg-guide     # SSG 预渲染
```

每个页面旁边标注了渲染方式。圆圈 `●` 表示 SSG，空心圆 `○` 表示静态。

## 总结

SSG 是内容型网站的首选方案。Next.js 的 `generateStaticParams` 配合 Markdown 内容源，可以零成本实现高性能的静态博客。
