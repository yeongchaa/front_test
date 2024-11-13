"use client"

import React from "react";
import localFont from "next/font/local";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // React Query 추가
import "./globals.css";

// 폰트 설정
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


// Query Client 생성
const queryClient = new QueryClient(); // QueryClient 객체 생성

// 레이아웃 컴포넌트
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>        
      </body>
    </html>
  );
}
