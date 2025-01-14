"use client";

import React, { useState } from "react";
import { format, formatDistanceToNow, differenceInDays } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image"; // Next.js Image 컴포넌트
import { HiOutlineDotsHorizontal } from "react-icons/hi"; // React Icons 사용
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AuthorInfoProps {
  userName?: string;
  createdAt?: string;
  showTime?: boolean; // 시간 표시 여부
  id: string; // 게시글 ID
  authorId: string; // 게시글 작성자의 ID
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({
  userName = "Default User",
  createdAt,
  showTime = false,
  id,
  authorId,
}) => {
  const { data: session } = useSession(); // 세션 데이터 가지고 오기
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

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

  // 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeletePost = async () => {
    if (!window.confirm("게시글을 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("게시글 삭제 실패");
      }

      const result = await response.json();
      console.log(result.message);

      alert("게시글이 삭제되었습니다.");
      router.push("/");
    } catch (error) {
      console.error("게시글 삭제 중 오류 발생:", error);
    }
  };

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
      {session?.user?.id === authorId && (
        <div className="ml-auto">
          <button onClick={openModal}>
            <HiOutlineDotsHorizontal size={24} className="text-gray-600" />
          </button>
        </div>
      )}

      {/* 모달 */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeModal} // 배경 클릭 시 모달 닫기
        >
          <div
            className="bg-white rounded-[16px] w-[300px] max-w-sm"
            onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 이벤트 버블링 방지
          >
            <ul className="text-center text-[15px]">
              <li className="h-[46px] border-b cursor-pointer text-blue-500 flex items-center justify-center">
                수정
              </li>
              <li
                className="h-[46px] border-b cursor-pointer text-red-500 flex items-center justify-center"
                onClick={handleDeletePost}
              >
                삭제
              </li>
              <li
                className="h-[46px] cursor-pointer flex items-center justify-center"
                onClick={closeModal}
              >
                취소
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorInfo;
