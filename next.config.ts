import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vhcqveywlxjlktyxfdyb.supabase.co",
      }
    ]
  }
};

export default nextConfig;
