import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'ai-wallpaper-hoimingkenny.s3.amazonaws.com',
      },
    ],
  },
}

export default nextConfig;
