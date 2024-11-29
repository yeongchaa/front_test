import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // 클라이언트 요청 경로
        destination: "http://api4adc.cafe24app.com/api/:path*", // 실제 API 서버 경로
      },
    ];
  },
};

export default nextConfig;
