import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["https://www.googleapis.com"],
      bodySizeLimit: "20mb",
    },
  },
};

export default nextConfig;
