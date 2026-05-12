import Link from "next/link";
import type { Post } from "@/lib/posts";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="group">
      <Link href={`/posts/${post.slug}`}>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">
          {post.title}
        </h2>
        <time
          dateTime={post.date}
          className="mt-1 block text-sm text-zinc-500 dark:text-zinc-400"
        >
          {new Date(post.date).toLocaleDateString("zh-CN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        {post.excerpt && (
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </Link>
      <div className="mt-4 border-b border-zinc-100 dark:border-zinc-800" />
    </article>
  );
}
