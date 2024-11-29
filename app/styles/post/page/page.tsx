// 특정 게시글 상세 페이지
"use client";

import React, { useState } from "react";
import CommentInput from "@/components/post/CommentInput";
import AuthorInfo from "@/components/post/AuthorInfo";
import SlideCarousel from "@/components/post/SlideCarousel"; // SlideCarousel 경로를 프로젝트 구조에 맞게 설정
import LikeButton from "@/components/post/LikeButton"; // LikeButton 경로를 프로젝트 구조에 맞게 설정
import CommentIcon from "@/components/post/CommentIcon";
import BackButton from "@/components/common/BackButton"; // 뒤로가기 버튼 컴포넌트 경로
import HeaderTitle from "@/components/common/HeaderTitle"; // 제목 컴포넌트 경로

export default function Home() {
  const [comment, setComment] = useState("");

  const handleChange = (value: string) => {
    setComment(value);
  };

  // 캐러셀에 사용할 이미지 리스트
  const images = [
    "/image1.jpeg", // 실제 이미지 경로로 교체
    "/image2.jpeg",
    "/image3.jpeg",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 상단 헤더: 뒤로가기 버튼 + 제목 */}
      <div className="h-[44px] flex items-center px-[16px] bg-white relative">
        {/* 뒤로가기 버튼 (왼쪽) */}
        <div className="absolute left-0">
          <BackButton onBack={() => console.log("뒤로 가기")} />
        </div>
        {/* 타이틀 (중앙) */}
        <div className="flex-grow flex justify-center">
          <HeaderTitle title="게시물" />
        </div>
      </div>

      {/* 작성자 정보 */}
      <div className="py-2 px-4">
        <AuthorInfo
          userName="Yeongcar"
          createdAt="2 hours ago"
          showTime={true}
        />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1">
        {/* 슬라이드 캐러셀 */}
        <SlideCarousel images={images} />

        {/* 좋아요 버튼 */}
        <div className="p-4">
          <div className="flex items-center justify-end space-x-4">
            <LikeButton />
            <CommentIcon />
          </div>
        </div>
      </div>

      {/* 제목+내용+태그 */}
      <div className="p-4">
        <h2>
          🖤이주미의 ”아디다스 x 송 포 더 뮤트 컨트리 OG 코어 블랙 코어 화이트”
          스타일링🤍
        </h2>
        <br />
        <h4>
          스타 : 이주미
          <br />
          브랜드 : 아디다스
          <br />
          스타일 코드 : ID3546
          <br />
          한글 상품명 : 아디다스 X 송 포더 뮤트 컨트리 OG 코어 블랙 코어 화이트
          <br />
          출처 : 이주미 인스타그램
          <br />
          날짜 : 2024년 11월 08일
          <br />
        </h4>
      </div>

      {/* 하단 고정 댓글 입력 컴포넌트 */}
      <div className="sticky bottom-0 bg-white p-4 border-t border-gray-300">
        <CommentInput onChange={handleChange} value={comment} />
      </div>
    </div>
  );
}
