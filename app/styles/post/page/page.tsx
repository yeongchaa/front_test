"use client";
import React, { useState } from "react";
import CommentInput from "@/components/post/CommentInput";
import AuthorInfo from "@/components/post/AuthorInfo";
import SlideCarousel from "@/components/post/SlideCarousel";
import LikeButton from "@/components/post/LikeButton";
import CommentIcon from "@/components/post/CommentIcon";
import BackButton from "@/components/common/BackButton";
import HeaderTitle from "@/components/common/HeaderTitle";
import HashtagList from "@/components/post/HashtagList"; // HashtagList 컴포넌트 임포트
import CommentButton from "@/components/post/CommentButton";

export default function Home() {
  const [comment, setComment] = useState(""); // 댓글 입력값 상태
  const [isCommentInputVisible, setCommentInputVisible] = useState(false); // 댓글 입력창 표시 여부 상태

  const handleCommentClick = () => {
    setCommentInputVisible(true); // 댓글 입력창 활성화
  };

  const handleChange = (value: string) => {
    setComment(value);
  };

  // 캐러셀에 사용할 이미지 리스트
  const images = ["/image1.jpeg", "/image2.jpeg", "/image3.jpeg"];

  // 해시태그 리스트
  const hashtags = [
    {
      href: "https://kream.co.kr/social/tags/shoeporstar",
      text: "#shoeporstar",
    },
    { href: "https://kream.co.kr/social/tags/슈퍼스타", text: "#슈퍼스타" },
    {
      href: "https://kream.co.kr/social/tags/셀럽스타일링",
      text: "#셀럽스타일링",
    },
    { href: "https://kream.co.kr/social/tags/셀럽패션", text: "#셀럽패션" },
    { href: "https://kream.co.kr/social/tags/스니커패션", text: "#스니커패션" },
    {
      href: "https://kream.co.kr/social/tags/스니커즈",
      text: "#스니커즈즈즈즈즈즈즈즈",
    },
    {
      href: "https://kream.co.kr/social/tags/shoeporstar",
      text: "#shoeporstar",
    },
    {
      href: "https://kream.co.kr/social/tags/슈퍼스타",
      text: "#슈퍼스타타타타타",
    },
    {
      href: "https://kream.co.kr/social/tags/셀럽스타일링",
      text: "#셀럽스타일링",
    },
    { href: "https://kream.co.kr/social/tags/셀럽패션", text: "#셀럽패션" },
    { href: "https://kream.co.kr/social/tags/스니커패션", text: "#스니커패션" },
    { href: "https://kream.co.kr/social/tags/스니커즈", text: "#스니커즈" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 상단 헤더 */}
      <div className="h-[44px] flex items-center px-[16px] bg-white relative">
        <div className="absolute left-0">
          <BackButton onBack={() => console.log("뒤로 가기")} />
        </div>
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
        <SlideCarousel images={images} />
      </div>

      {/* 좋아요 버튼 */}
      <div className="py-3 px-4">
        <div className="flex items-center justify-end space-x-4">
          <LikeButton />
          <CommentIcon />
        </div>

        {/* 제목+내용 */}
        <div className="pt-[13px]">
          <h2>🖤이주미의 스타일링🤍</h2>
          <br />
          <h4>
            스타 : 이주미
            <br />
            브랜드 : 아디다스
            <br />
            스타일 코드 : ID3546
            <br />
            한글 상품명 : 아디다스 X 송 포더 뮤트 컨트리 OG 코어 블랙 코어
            화이트
            <br />
            출처 : 이주미 인스타그램
            <br />
            날짜 : 2024년 11월 08일
            <br />
          </h4>
        </div>

        {/* 해시태그 리스트 */}
        <HashtagList hashtags={hashtags} />
      </div>

      {/* 댓글 섹션 */}
      {!isCommentInputVisible && ( // 댓글 입력창이 비활성화 상태일 때만 버튼 표시
        <div className="pt-2 h-[129px] flex items-center justify-center border-t border-gray-200">
          <div className="text-center py-8">
            <p>첫번째로 댓글을 남겨보세요.</p>
            <CommentButton onClick={handleCommentClick} />
          </div>
        </div>
      )}

      {/* 하단 고정 댓글 입력 컴포넌트 */}
      {isCommentInputVisible && ( // 댓글 입력창이 활성화 상태일 때만 입력 필드 표시
        <div className="sticky bottom-0 bg-white p-4 border-t border-gray-300">
          <CommentInput onChange={handleChange} value={comment} />
        </div>
      )}
    </div>
  );
}
