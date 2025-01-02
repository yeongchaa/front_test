"use client";

import React from "react";
import Masonry from "react-masonry-css"; // 라이브러리 import
import PostCard, { PostCardProps } from "./PostCard";

export interface PostCardGridProps {
  posts: PostCardProps[]; // 게시글 데이터
  onPostClick: (postId: string) => void; // 클릭 이벤트 핸들러
}

const PostCardGrid: React.FC<PostCardGridProps> = ({ posts, onPostClick }) => {
  // Masonry의 브레이크포인트 설정
  const breakpointColumns = {
    default: 4, // 기본 열 개수
    768: 2, // 화면 너비가 768px 이하일 때 2개
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex" // Masonry 컨테이너 스타일
      columnClassName="p space-y-0.5" // 각 열 스타일
    >
      {posts.map((post, index) => (
        <div
          key={`${post.id}-${index}`} // 고유한 key 생성
          className="bg-white px-1.5 rounded-lg transition-shadow cursor-pointer"
        >
          <PostCard
            {...post} // PostCardProps의 모든 데이터 전달
            onClick={onPostClick} // 클릭 이벤트 전달
          />
        </div>
      ))}
    </Masonry>
  );
};

export default PostCardGrid;
