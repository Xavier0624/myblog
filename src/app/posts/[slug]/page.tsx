import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import PostContent from "@/components/PostContent";
import TableOfContents from "@/components/TableOfContents";
import Link from "next/link";
import GithubSlugger from "github-slugger";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function extractTOC(content: string): TocItem[] {
  const slugger = new GithubSlugger();
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    items.push({
      level: match[1].length,
      text: match[2],
      id: slugger.slug(match[2]),
    });
  }
  return items;
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

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

  const toc = extractTOC(post.content);

  return (
    <article className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
      <Link
        href="/"
        className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
      >
        &larr; 首页
      </Link>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12">
        {/* Main content */}
        <div className="min-w-0">
          <header>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {post.title}
            </h1>
            <time
              dateTime={post.date}
              className="mt-2 block text-sm text-zinc-500 dark:text-zinc-400"
            >
              {new Date(post.date).toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-600 dark:text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="mt-12">
            <PostContent content={post.content} />
          </div>
        </div>

        {/* TOC sidebar */}
        {toc.length > 0 && (
          <div className="hidden lg:block">
            <div className="sticky top-14 pt-8">
              <TableOfContents items={toc} />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
