import type { MetadataRoute } from "next";
import { academyProgramPath, academyPrograms } from "@/lib/academia";
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
  { path: "/aviso-legal", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacidad", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route.path}`,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...academyPrograms.filter(({ approved }) => approved).map(({ slug }) => ({
      url: `${SITE_URL}${academyProgramPath(slug)}`,
    })),
    ...practiceLandings.map((landing) => ({
      url: `${SITE_URL}/areas-de-practica/${landing.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}
