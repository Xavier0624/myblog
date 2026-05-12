import Image from "next/image";

export default function AboutPage() {
  const socialLinks = [
    { label: "GitHub", url: "https://github.com" },
    { label: "Twitter", url: "https://twitter.com" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 sm:py-24">
      <div className="flex flex-col sm:flex-row items-start gap-8">
        <Image
          src="/avatar.webp"
          alt="头像"
          width={96}
          height={96}
          className="w-24 h-24 rounded-full object-cover shrink-0"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Xavier
          </h1>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
            华东师范大学软件工程大三在读。
          </p>

          <div className="mt-6 flex gap-4">
            {socialLinks.map((link) => (
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
      </div>
    </div>
  );
}
