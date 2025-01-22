import React, { useState } from "react";
import Image from "next/image";
import LikeComment from "./likeComment";
import { useSession } from "next-auth/react";
import { format, formatDistanceToNow, differenceInDays } from "date-fns";
import { ko } from "date-fns/locale";

interface Comment {
  id: string;
  user_id?: string; // 댓글 작성자 ID
  content: string;
  created_at: string;
  username: string;
  like_users?: string[];
  like_count?: number;
  replies?: Comment[];
}

interface CommentBoxProps {
  comments: Comment[];
  postId: string; // 해당 게시글 ID
  onCommentDelete?: (commentId: string) => void; // 삭제 후 실행될 콜백
}

const CommentBox: React.FC<CommentBoxProps> = ({
  comments,
  postId,
  onCommentDelete,
}) => {
  const { data: session } = useSession(); // 로그인 세션 정보
  const [localComments, setLocalComments] = useState(comments); // 로컬 상태 관리

  // 댓글 삭제 핸들러
  const handleDelete = async (commentId: string) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      try {
        const response = await fetch(
          `/api/posts/${postId}/comments/${commentId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.accessToken}`, // 필요 시 토큰 추가
            },
          }
        );

        if (!response.ok) {
          throw new Error("댓글 삭제에 실패했습니다.");
        }

        // 댓글 삭제 성공 시 로컬 상태 업데이트
        setLocalComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );

        // 삭제 후 콜백 실행
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onCommentDelete && onCommentDelete(commentId);

        alert("댓글이 삭제되었습니다.");
      } catch (error) {
        console.error("댓글 삭제 에러:", error);
        alert("댓글 삭제 중 문제가 발생했습니다.");
      }
    }
  };

  return (
    <div>
      {localComments.map((comment) => {
        const uploadDate = new Date(comment.created_at);
        const now = new Date();

        let timeText = "";
        if (differenceInDays(now, uploadDate) < 8) {
          timeText = formatDistanceToNow(uploadDate, {
            addSuffix: true,
            locale: ko,
          }).replace(/^약 /, "");
        } else {
          timeText = format(uploadDate, "yyyy년 MM월 dd일");
        }

        return (
          <div key={comment.id}>
            {/* 댓글 */}
            <div className="flex py-3 px-4">
              {/* Profile_Image */}
              <div className="w-[34px] h-[34px] mr-[10px]">
                <Image
                  src="/default.png"
                  alt={`${comment.username}의 프로필 사진`}
                  layout="responsive"
                  width={34}
                  height={34}
                  className="rounded-full"
                />
              </div>
              {/* Comment_detail */}
              <div>
                <div className="text-[14px]">
                  <span className="mr-2 font-bold">{comment.username}</span>
                  <span className="text-[#222222] mr-1">{comment.content}</span>
                </div>
                <div className="mt-[5px] text-[rgba(34,34,34,0.5)] text-[12px] flex items-center">
                  <span className="mr-1">{timeText}</span>
                  <span className="mr-1"> • </span>
                  <a className="mr-1 flex items-center whitespace-nowrap">
                    좋아요
                    <strong className="pl-1">
                      <LikeComment
                        type="count"
                        postId={postId}
                        commentId={comment.id}
                        likeUsers={comment.like_users || []}
                        initialCount={comment.like_count || 0}
                      />
                    </strong>
                    개
                  </a>
                  <a className="ml-2 mr-3 font-bold">답글쓰기</a>
                  {session?.user?.id === comment.user_id && (
                    <button onClick={() => handleDelete(comment.id)}>
                      삭제
                    </button>
                  )}
                </div>
              </div>
              <div className="ml-auto pl-[5px] mt-[2px]">
                <LikeComment
                  type="icon"
                  postId={postId}
                  commentId={comment.id}
                  likeUsers={comment.like_users || []}
                  initialCount={comment.like_count || 0}
                />
              </div>
            </div>
            {/* 답글 */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="pl-[42px]">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex py-3 px-4">
                    {/* Profile_Image */}
                    <div className="w-[24px] h-[24px] mr-[10px]">
                      <Image
                        src="/default.png"
                        alt={`${reply.username}의 프로필 사진`}
                        layout="responsive"
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    </div>
                    {/* Reply_detail */}
                    <div>
                      <div className="text-[14px]">
                        <span className="mr-2 font-bold">{reply.username}</span>
                        <span className="text-[#222222] mr-1">
                          {reply.content}
                        </span>
                      </div>
                      <div className="mt-[5px] text-[rgba(34,34,34,0.5)] text-[12px] flex items-center">
                        <span className="mr-1">{timeText}</span>
                        <span className="mr-1"> • </span>
                        <a className="mr-1 flex items-center whitespace-nowrap">
                          좋아요
                          <strong className="pl-1">
                            <LikeComment
                              type="count"
                              postId={postId}
                              commentId={reply.id}
                              likeUsers={reply.like_users || []}
                              initialCount={reply.like_count || 0}
                            />
                          </strong>
                          개
                        </a>
                        <a className="ml-2 mr-3 font-bold">답글쓰기</a>
                        {session?.user?.id === reply.user_id && (
                          <button onClick={() => handleDelete(reply.id)}>
                            삭제
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="ml-auto pl-[5px] mt-[2px]">
                      <LikeComment
                        type="icon"
                        postId={postId}
                        commentId={reply.id}
                        likeUsers={reply.like_users || []}
                        initialCount={reply.like_count || 0}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CommentBox;
