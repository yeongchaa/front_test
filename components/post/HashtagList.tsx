// hashtag 배치 컴포넌트
"use client";
import React from "react";
import Hashtag from "./Hashtag";

interface HashtagListProps {
  hashtags: { href?: string; text: string }[];
}

const HashtagList: React.FC<HashtagListProps> = ({ hashtags }) => {
  return (
    <div className="flex flex-wrap gap-1 mt-1 text-sm leading-tight tracking-tight break-all whitespace-normal">
      {hashtags.map((tag, index) => (
        <Hashtag key={index} href={tag.href} text={tag.text} />
      ))}
    </div>
  );
};

export default HashtagList;
