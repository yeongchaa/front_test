// 모든 페이지에서 공통으로 적용될 설정
"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // React Query 추가
import "./globals.css";

// Query Client 생성
const queryClient = new QueryClient(); // QueryClient 객체 생성

// 레이아웃 컴포넌트
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-sans">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
