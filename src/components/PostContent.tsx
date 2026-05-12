import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

export default function PostContent({ content }: { content: string }) {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeSlug]}>
        {content}
      </Markdown>
    </div>
  );
}
