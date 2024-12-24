"use client";

import React from "react";
import PostCard, { PostCardProps } from "./PostCard";
import Link from "next/link";

export interface PostCardGridProps {
  posts: PostCardProps[]; // 게시글 데이터
  onPostClick: (postId: string) => void; // 클릭 이벤트 핸들러
}

const PostCardGrid: React.FC<PostCardGridProps> = ({ posts, onPostClick }) => {
  // 두 개의 열로 나누기
  const columnCount = 4;
  const columns: PostCardProps[][] = Array.from(
    { length: columnCount },
    () => []
  );

  posts.forEach((post, idx) => {
    columns[idx % columnCount].push(post); // 번갈아가며 열에 추가
  });

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
      {columns.map((column, colIdx) => (
        <div className="flex flex-col flex-1" key={`col-${colIdx}`}>
          {column.map((post, idx) => (
            <Link
              href={`/styles/post/${post.id}`} // 링크로 연결
              key={`post-${colIdx}-${idx}`}
              className="cursor-pointer" // 마우스 손 모양으로 변경
            >
              <PostCard
                {...post}
                onClick={(postId) => {
                  console.log("PostCardGrid Prop: Post clicked:", {
                    posts,
                    onPostClick,
                  }); // 확인만하고 제거하기
                  onPostClick(postId);
                }}
              />
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PostCardGrid;
