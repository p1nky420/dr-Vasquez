import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [480, 640, 768, 1024, 1280, 1536],
  },
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        { key: "X-DNS-Prefetch-Control", value: "on" },
        { key: "X-Content-Type-Options", value: "nosniff" },
      ],
    },
    {
      source: "/portrait-editorial-authority-v2.png",
      headers: [
        { key: "Link", value: "</portrait-editorial-authority-v2.png>; rel=preload; as=image" },
      ],
    },
  ],
};

export default nextConfig;
