import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export function academyMetadata({
  path,
  title,
  description,
  photo,
  index = true,
}: {
  path: string;
  title: string;
  description: string;
  photo: { src: string; alt: string; width: number; height: number };
  index?: boolean;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: [{ url: photo.src, alt: photo.alt, width: photo.width, height: photo.height }], type: "website", locale: "es_EC" },
    twitter: { card: "summary_large_image", title, description, images: [{ url: photo.src, alt: photo.alt }] },
    robots: { index, follow: true },
  };
}
