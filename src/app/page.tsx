import { getAllPosts, getAllTags } from "@/lib/posts";
import { getAuthor } from "@/lib/author";
import HomeContent from "@/components/HomeContent";

export default function Home() {
  const posts = getAllPosts();
  const allTags = getAllTags();
  const author = getAuthor();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        文章
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        记录思考与所学
      </p>

      <div className="mt-8">
        <HomeContent posts={posts} allTags={allTags} author={author} />
      </div>
    </div>
  );
}
