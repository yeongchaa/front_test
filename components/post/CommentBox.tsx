import React, { useState } from "react";
import Image from "next/image";
import UserName from "../Masonry/UserName";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { formatDistanceToNow, differenceInDays, format } from "date-fns";
import { ko } from "date-fns/locale";

export interface Reply {
  id: string;
  username: string;
  content: string;
  created_at: string;
  likes: number;
  user_id: string;
  currentUserId: string; // 현재 로그인한 유저의 ID
  onCommentDelete: (commentId: string) => Promise<void>;
}

interface CommentBoxProps {
  id: string; // 댓글 ID
  userName: string; // 사용자 이름
  content: string; // 댓글 내용
  uploadTime: string; // 댓글 업로드 시간
  likes: number; // 좋아요 수
  user_id: string; // 댓글 작성자 ID
  currentUserId: string; // 현재 로그인한 유저의 ID
  postId: string; // 게시물 ID 추가
  onReplyClick: (parentId: string, username: string) => void;
  onCommentDelete: (
    commentId: string,
    postId: string,
    isReply: boolean
  ) => Promise<void>;
  replies?: Reply[]; // 선택적 속성으로 설정
  isReply?: boolean; // 답글 여부 추가
}

const CommentBox: React.FC<CommentBoxProps> = ({
  id,
  userName,
  content,
  uploadTime,
  likes: initialLikes,
  user_id,
  currentUserId,
  onReplyClick,
  onCommentDelete,
  replies = [], // 기본값을 빈 배열로 설정
  postId,
  isReply,
}) => {
  const [likes, setLikes] = useState(initialLikes); // 좋아요 수 상태
  const [isLiked, setIsLiked] = useState(false); // 좋아요 여부 상태

  const handleLikeToggle = () => {
    setIsLiked(!isLiked); // 좋아요 상태 토글
    setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1)); // 좋아요 수 업데이트
  };

  // 디버깅 로그 추가
  console.log("Rendering CommentBox:");
  console.log("  Comment ID:", id);
  console.log("  UserName:", userName);
  console.log("  Content:", content);
  console.log("  User ID (comment owner):", user_id);
  console.log("  Current User ID:", currentUserId);
  console.log("  Is Reply:", isReply);
  console.log("  Replies:", replies);

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
                console.log("Reply Clicked:", { parentId: id, userName }); // 디버깅 로그
                onReplyClick(id, userName);
              }}
            >
              답글쓰기
            </a>
            {user_id === currentUserId && (
              <a
                onClick={() => {
                  console.log("Delete Clicked:", {
                    commentId: id,
                    postId,
                    isReply,
                  }); // 디버깅 로그
                  onCommentDelete(id, postId, !!isReply);
                }}
                className="cursor-pointer"
              >
                삭제
              </a>
            )}
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
          {replies.map((reply) => {
            console.log("Rendering Reply:", reply); // 디버깅 로그
            return (
              <CommentBox
                key={reply.id}
                id={reply.id}
                userName={reply.username}
                content={reply.content}
                uploadTime={
                  reply.created_at
                    ? differenceInDays(new Date(), new Date(reply.created_at)) >
                      7
                      ? format(new Date(reply.created_at), "yyyy-MM-dd")
                      : formatDistanceToNow(new Date(reply.created_at), {
                          addSuffix: true,
                          locale: ko,
                        })
                    : "시간 정보 없음"
                }
                likes={reply.likes}
                user_id={reply.user_id}
                currentUserId={currentUserId}
                onReplyClick={onReplyClick}
                onCommentDelete={onCommentDelete}
                postId={postId} // 게시물 ID 전달
                isReply={true} // 답글임을 명시
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CommentBox;
