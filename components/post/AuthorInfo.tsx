"use client";

import React from "react";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image"; // Next.js Image 컴포넌트

interface AuthorInfoProps {
  userName?: string;
  createdAt?: string;
  showTime?: boolean; // 작성 시간을 표시할지 여부
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({
  userName = "Default User",
  createdAt,
  showTime = false,
}) => {
  // 작성 시간 기준 상대 시간 계산
  const relativeTime = createdAt
    ? formatDistanceToNow(new Date(createdAt), {
        addSuffix: true,
        locale: ko,
      }).replace(/^약 /, "")
    : "";

  return (
    <div className="relative w-100% flex items-end ">
      {/* 프로필 이미지 */}
      <div className="w-[34px] h-[34px]">
        <Image
          src="/default.png"
          alt="Profile"
          width={34}
          height={34}
          className="rounded-full object-cover"
        />
      </div>
      {/* 사용자 정보 */}
      <div className="ml-2 flex flex-col">
        <span className="text-sm font-bold leading-4">{userName}</span>
        {showTime && createdAt && (
          <span className="text-xs text-gray-500 leading-4">
            {relativeTime}
          </span>
        )}
      </div>
    </div>
  );
};

export default AuthorInfo;
