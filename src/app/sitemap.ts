import type { MetadataRoute } from "next";
import { SITE_URL, practiceLandings } from "@/lib/seo";

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const staticRoutes: Entry[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/contacto", priority: 0.9, changeFrequency: "monthly" },
  { path: "/preguntas-frecuentes", priority: 0.85, changeFrequency: "monthly" },
  { path: "/publicaciones", priority: 0.8, changeFrequency: "monthly" },
  { path: "/areas-de-practica", priority: 0.9, changeFrequency: "monthly" },
  { path: "/derecho-penal-economico", priority: 0.9, changeFrequency: "monthly" },
  { path: "/firma", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/academia", priority: 0.6, changeFrequency: "monthly" },
  { path: "/eventos", priority: 0.6, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...practiceLandings.map((landing) => ({
      url: `${SITE_URL}/areas-de-practica/${landing.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}
