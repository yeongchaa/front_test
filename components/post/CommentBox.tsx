import React, { useState } from "react";
import Image from "next/image";
import UserName from "../Masonry/UserName";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { formatDistanceToNow, differenceInDays, format } from "date-fns";
import { ko } from "date-fns/locale";

interface Comment {
  id: string;
  username: string;
  content: string;
  created_at: string;
  likes: number;
  replies?: Comment[]; // 선택적 replies 속성 추가
}

interface CommentBoxProps {
  id: string; // 댓글 ID
  userName: string; // 사용자 이름
  content: string; // 댓글 내용
  uploadTime: string; // 댓글 업로드 시간
  likes: number; // 좋아요 수
  onReplyClick: (parentId: string, username: string) => void; // 답글 쓰기 이벤트 핸들러
  replies?: Comment[]; // 선택적 속성으로 설정
}

const CommentBox: React.FC<CommentBoxProps> = ({
  id,
  userName,
  content,
  uploadTime,
  likes: initialLikes,
  onReplyClick,
  replies = [], // 기본값을 빈 배열로 설정
}) => {
  const [likes, setLikes] = useState(initialLikes); // 좋아요 수 상태
  const [isLiked, setIsLiked] = useState(false); // 좋아요 여부 상태

  const handleLikeToggle = () => {
    setIsLiked(!isLiked); // 좋아요 상태 토글
    setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1)); // 좋아요 수 업데이트
  };

  return (
    <div className="px-4 py-3">
      <div className="flex">
        {/* 프로필 이미지 */}
        <div className="mr-[10px]">
          <div
            className="relative rounded-full overflow-hidden"
            style={{
              width: "34px",
              height: "34px",
              border: "1px solid #dbdbdb",
            }}
          >
            <Image
              src="/default.png" // 프로필 이미지 경로
              alt="프로필 사진"
              width={34}
              height={34}
            />
          </div>
        </div>

        {/* 댓글 내용 */}
        <div className="flex-1">
          <div className="flex items-center">
            <UserName
              text={userName}
              type="medium"
              className="mr-2 font-bold text-[#000000]"
            />
            <span className="text-gray-700">{content}</span>
          </div>
          <div className="mt-[6px] text-xs text-[rgba(34,34,34,0.5)]">
            <span className="mr-1">{uploadTime}</span>
            <span className="mr-1">•</span>
            <a className="mr-3 cursor-pointer">좋아요 {likes}</a>
            <a
              className="mr-3 font-bold cursor-pointer"
              onClick={() => {
                console.log("Reply Clicked:", id, userName);
                onReplyClick(id, userName);
              }}
            >
              답글쓰기
            </a>
          </div>
        </div>

        {/* 좋아요 아이콘 */}
        <div
          className="pl-[5px] flex items-center cursor-pointer"
          onClick={handleLikeToggle}
        >
          {isLiked ? (
            <HeartIconSolid className="w-6 h-6 text-red-500" />
          ) : (
            <HeartIcon className="w-6 h-6 text-gray-400" />
          )}
        </div>
      </div>

      {/* 답글 목록 */}
      {replies.length > 0 && ( // replies가 있을 때만 렌더링
        <div>
          {replies.map((reply) => (
            <CommentBox
              key={reply.id}
              id={reply.id}
              userName={reply.username}
              content={reply.content}
              uploadTime={
                reply.created_at
                  ? differenceInDays(new Date(), new Date(reply.created_at)) > 7
                    ? format(new Date(reply.created_at), "yyyy-MM-dd")
                    : formatDistanceToNow(new Date(reply.created_at), {
                        addSuffix: true,
                        locale: ko,
                      })
                  : "시간 정보 없음"
              }
              likes={reply.likes}
              onReplyClick={onReplyClick}
              replies={reply.replies || []} // 기본값 설정
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentBox;
