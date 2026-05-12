export interface Author {
  name: string;
  avatar: string;
  bio: string;
  socialLinks: { label: string; url: string }[];
}

export function getAuthor(): Author {
  return {
    name: "Xavier",
    avatar: "/avatar.webp",
    bio: "华东师范大学软件工程大三在读。",
    socialLinks: [
      { label: "GitHub", url: "https://github.com" },
      { label: "Twitter", url: "https://twitter.com" },
    ],
  };
}
