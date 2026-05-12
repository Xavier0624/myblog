import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-base text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
          我的博客
        </Link>
        <Link href="/about" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
          关于
        </Link>
      </nav>
    </header>
  );
}
