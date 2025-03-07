import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // crossOrigin: "use-credentials",
  // source: "/:path*",
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS, PATCH, PUT, DELETE",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, x-requested-with",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
