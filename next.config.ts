import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // QR-codes wijzen naar /<gast>/qr, zodat scans apart zichtbaar zijn in Analytics
  async rewrites() {
    return [{ source: "/:gast/qr", destination: "/:gast" }];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
};

export default nextConfig;
