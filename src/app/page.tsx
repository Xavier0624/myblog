import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 sm:py-24">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        文章
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        记录思考与所学
      </p>

      <div className="mt-12 flex flex-col gap-8">
        {posts.length === 0 ? (
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            还没有文章，开始写第一篇吧。
          </p>
        ) : (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>
    </div>
  );
}
