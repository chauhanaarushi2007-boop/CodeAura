import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://codeaurix.vercel.app",
      lastModified: new Date(),
    },
    {
      url: "https://codeaurix.vercel.app/tutorials",
      lastModified: new Date(),
    },
    {
      url: "https://codeaurix.vercel.app/quizzes",
      lastModified: new Date(),
    },
    {
      url: "https://codeaurix.vercel.app/references",
      lastModified: new Date(),
    },
  ];
}
