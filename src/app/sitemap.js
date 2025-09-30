import { items } from "@/lib/data";

export default async function sitemap() {
  const base = "https://example.com";
  const now = new Date().toISOString();
  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    ...items.map((i) => ({
      url: `${base}/${i.slug}`,
      lastModified: i.updatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    })),
  ];
}
