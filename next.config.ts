import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "ac.goit.global", protocol: "https" }],
  },
  reactCompiler: true,
};

export default nextConfig;
