import type { Post } from "@/lib/posts";
import PostCard from "./PostCard";

export default function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <p className="text-zinc-500 dark:text-zinc-400 text-sm">
        该标签下还没有文章。
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
