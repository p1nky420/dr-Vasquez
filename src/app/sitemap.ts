import type { MetadataRoute } from "next";

const siteUrl = "https://faustovasquezabogados.com";
const lastModified = new Date("2026-06-11");

const routes = [
  "",
  "/firma",
  "/areas-de-practica",
  "/derecho-penal-economico",
  "/contacto",
  "/blog",
  "/academia",
  "/eventos",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
  }));
}
