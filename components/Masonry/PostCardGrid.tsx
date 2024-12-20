// Masonry 스타일로 PostCard들을 렌더링하는 그리드 컴포넌트
"use client";

import React from "react";
import PostCard, { PostCardProps } from "./PostCard";

export interface PostCardGridProps {
  posts: PostCardProps[];
}

const PostCardGrid: React.FC<PostCardGridProps> = ({ posts }) => {
  // 두 개의 열로 나누기
  const columnCount = 2;
  const columns: PostCardProps[][] = Array.from(
    { length: columnCount },
    () => []
  );

  posts.forEach((post, idx) => {
    columns[idx % columnCount].push(post); // 번갈아가며 열에 추가
  });

  return (
    <div className="flex gap-4">
      {columns.map((column, colIdx) => (
        <div className="flex flex-col flex-1" key={`col-${colIdx}`}>
          {column.map((post, idx) => (
            <PostCard key={`post-${colIdx}-${idx}`} {...post} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PostCardGrid;
