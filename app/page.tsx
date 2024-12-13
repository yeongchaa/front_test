"use client";

import { useState, useEffect } from "react";
import SearchHeader from "@/components/post/SearchHeader";
import BottomNavigation from "@/components/common/BottomNavigation";
import Sort from "@/components/common/Sort";
import PostCardGrid from "@/components/Masonry/PostCardGrid";
import { PostCardProps } from "@/components/Masonry/PostCard";

export default function HomePage() {
  const [posts, setPosts] = useState<PostCardProps[]>([]); // 상태 관리

  // 더미 데이터 생성
  useEffect(() => {
    const dummyData: PostCardProps[] = [
      {
        socialImg: { src: "/image2.jpeg", alt: "이미지 1" },
        cardDetail: {
          profileImage: {
            src: "/profile1.jpeg",
            alt: "프로필 이미지 1",
          },
          userName: { text: "userone", type: "small" },
          like: { size: "small" },
          textBox: { text: "어그 타스만!!!!!" },
        },
      },
      {
        socialImg: { src: "/img3.jpeg", alt: "이미지 2" },
        cardDetail: {
          profileImage: {
            src: "/profile1.jpeg",
            alt: "프로필 이미지 2",
          },
          userName: { text: "usertwo", type: "small" },
          like: { size: "small" },
          textBox: {
            text: "아디다스 웨일스 보너..이제 하나쯤은 가지고 있어야 하지 않나 싶어서",
          },
        },
      },
      {
        socialImg: { src: "/img5.jpeg", alt: "이미지 3" },
        cardDetail: {
          profileImage: {
            src: "/profile1.jpeg",
            alt: "프로필 이미지 3",
          },
          userName: { text: "userthree", type: "small" },
          like: { size: "small" },
          textBox: { text: "겨울룩" },
        },
      },
      {
        socialImg: { src: "/img6.jpeg", alt: "이미지 4" },
        cardDetail: {
          profileImage: {
            src: "/profile1.jpeg",
            alt: "프로필 이미지 4",
          },
          userName: { text: "userfour", type: "small" },
          like: { size: "small" },
          textBox: { text: "겨울에도 에어포스 ~~~~~" },
        },
      },
      {
        socialImg: { src: "/img7.jpeg", alt: "이미지 5" },
        cardDetail: {
          profileImage: {
            src: "/profile1.jpeg",
            alt: "프로필 이미지 5",
          },
          userName: { text: "userfour", type: "small" },
          like: { size: "small" },
          textBox: { text: "바라클라바 좀 바라" },
        },
      },
      {
        socialImg: { src: "/img8.jpeg", alt: "이미지 6" },
        cardDetail: {
          profileImage: {
            src: "/profile1.jpeg",
            alt: "프로필 이미지 6",
          },
          userName: { text: "userfour", type: "small" },
          like: { size: "small" },
          textBox: { text: "아크테릭스 아톰 헤비웨이트 후디 블랙" },
        },
      },
      {
        socialImg: { src: "/img9.jpeg", alt: "이미지 7" },
        cardDetail: {
          profileImage: {
            src: "/profile1.jpeg",
            alt: "프로필 이미지 7",
          },
          userName: { text: "userfour", type: "small" },
          like: { size: "small" },
          textBox: { text: "가볍고 편하고 따듯하고 예쁜 멋진 신발" },
        },
      },
    ];

    // 데이터를 상태에 설정
    setPosts(dummyData);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 검색창 헤더 UI */}
      <SearchHeader />
      <Sort />
      <div className="flex-1 px-4 pb-4">
        {/* PostCardGrid에 더미 데이터 전달 */}
        <PostCardGrid posts={posts} />
      </div>
      {/* 하단 네비게이션 */}
      <div className="sticky bottom-0">
        <BottomNavigation />
      </div>
    </div>
  );
}
