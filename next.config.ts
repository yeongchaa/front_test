import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path((?!auth/).*)", // 클라이언트 요청 경로
        destination: "http://api4adc.cafe24app.com/api/:path*", // 실제 API 서버 경로
      },
    ];
  },
  images: {
    unoptimized: true, // 이미지 최적화 비활성화
  },
};

export default nextConfig;
