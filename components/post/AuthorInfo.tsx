"use client";

import React from "react";
import { format, formatDistanceToNow, differenceInDays } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image"; // Next.js Image 컴포넌트
import { HiOutlineDotsHorizontal } from "react-icons/hi"; // React Icons 사용

interface AuthorInfoProps {
  userName?: string;
  createdAt?: string;
  showTime?: boolean; // 시간 표시 여부
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({
  userName = "Default User",
  createdAt,
  showTime = false,
}) => {
  // 작성 시간 계산 로직
  let timeText = "";

  if (createdAt) {
    const uploadDate = new Date(createdAt);
    const now = new Date();

    if (differenceInDays(now, uploadDate) < 8) {
      // 7일 이내라면 상대 시간 출력
      timeText = formatDistanceToNow(uploadDate, {
        addSuffix: true,
        locale: ko,
      }).replace(/^약 /, "");
    } else {
      // 8일 이상 지난 경우 절대 시간 출력
      timeText = format(uploadDate, "yyyy년 MM월 dd일");
    }
  }
  return (
    <div className="flex items-center justify-between">
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
            <span className="text-xs text-[rgba(34,34,34,0.5)] leading-4">
              {timeText}
            </span>
          )}
        </div>
      </div>
      {/* 케밥 메뉴 */}
      <div className="ml-auto">
        <button>
          <HiOutlineDotsHorizontal size={24} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default AuthorInfo;
