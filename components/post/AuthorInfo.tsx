import React from "react";
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
          <span className="text-xs text-gray-500 leading-4">{createdAt}</span>
        )}
      </div>
    </div>
  );
};

export default AuthorInfo;
