"use client";

import { useState } from "react";
import type { Post, TagCount } from "@/lib/posts";
import type { Author } from "@/lib/author";
import PostList from "./PostList";
import Sidebar from "./Sidebar";

export default function HomeContent({
  posts,
  allTags,
  author,
}: {
  posts: Post[];
  allTags: TagCount[];
  author: Author;
}) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredPosts = activeTag
    ? posts.filter((post) => post.tags.includes(activeTag))
    : posts;

  const handleTagClick = (tag: string) => {
    setActiveTag((prev) => (prev === tag ? null : tag));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12">
      {/* Main content */}
      <div>
        <PostList posts={filteredPosts} />
      </div>

      {/* Sidebar — hidden on mobile, visible on desktop */}
      <div className="hidden lg:block">
        <div className="sticky top-14 pt-8">
          <Sidebar
            author={author}
            allTags={allTags}
            recentPosts={posts}
            activeTag={activeTag}
            onTagClick={handleTagClick}
          />
        </div>
      </div>
    </div>
  );
}
