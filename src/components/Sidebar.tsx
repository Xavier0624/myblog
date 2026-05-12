import Link from "next/link";
import Image from "next/image";
import type { Author } from "@/lib/author";
import type { Post, TagCount } from "@/lib/posts";

interface SidebarProps {
  author: Author;
  allTags: TagCount[];
  recentPosts: Post[];
  activeTag: string | null;
  onTagClick: (tag: string) => void;
}

export default function Sidebar({
  author,
  allTags,
  recentPosts,
  activeTag,
  onTagClick,
}: SidebarProps) {
  return (
    <aside className="space-y-8">
      {/* Author card */}
      <div className="flex items-center gap-3">
        <Image
          src={author.avatar}
          alt={author.name}
          width={48}
          height={48}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {author.name}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{author.bio}</p>
        </div>
      </div>

      {/* Tags */}
      {allTags.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
            标签
          </h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map(({ tag, count }) => (
              <button
                key={tag}
                onClick={() => onTagClick(tag)}
                className={`inline-block rounded-full px-2.5 py-1 text-xs transition-colors cursor-pointer ${
                  activeTag === tag
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                }`}
              >
                {tag}
                <span className="ml-1 opacity-60">{count}</span>
              </button>
            ))}
          </div>
          {activeTag && (
            <button
              onClick={() => onTagClick(activeTag)}
              className="mt-2 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            >
              清除筛选
            </button>
          )}
        </div>
      )}

      {/* Recent posts */}
      {recentPosts.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
            最近文章
          </h3>
          <ul className="space-y-2">
            {recentPosts.slice(0, 5).map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Social links */}
      {author.socialLinks.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
            链接
          </h3>
          <div className="flex flex-col gap-1.5">
            {author.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                {link.label} &rarr;
              </a>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
