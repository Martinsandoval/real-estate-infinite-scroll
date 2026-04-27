import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://image.shutterstock.com/image-photo/**"),
      new URL("https://media-cdn.tripadvisor.com/**"),
    ],
  },
};

export default nextConfig;
