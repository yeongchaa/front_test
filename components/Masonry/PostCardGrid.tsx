import React from "react";
import PostCard, { PostCardProps } from "./PostCard";

interface PostCardGridProps {
  posts: PostCardProps[]; // PostCardProps 배열
}

const PostCardGrid: React.FC<PostCardGridProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }, (_, colIdx) => (
        <div className="grid gap-4" key={`col-${colIdx}`}>
          {posts
            .filter((_, postIdx) => postIdx % 4 === colIdx)
            .map((post, idx) => (
              <PostCard key={`postcard-${colIdx}-${idx}`} {...post} />
            ))}
        </div>
      ))}
    </div>
  );
};

export default PostCardGrid;
