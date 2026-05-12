export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-2xl mx-auto px-6 h-14 flex items-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          &copy; {new Date().getFullYear()} My Blog
        </p>
      </div>
    </footer>
  );
}
