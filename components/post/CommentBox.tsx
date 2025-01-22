import React from "react";
import Image from "next/image";
import LikeComment from "./likeComment";
import { format, formatDistanceToNow, differenceInDays } from "date-fns";
import { ko } from "date-fns/locale";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  username: string;
  like_users?: string[]; // 좋아요한 사용자 리스트
  like_count?: number; // 초기 좋아요 수
  replies?: Comment[]; // 답글 리스트
}

interface CommentBoxProps {
  comments: Comment[];
  postId: string; // 해당 게시글 ID
}

const CommentBox: React.FC<CommentBoxProps> = ({ comments, postId }) => {
  return (
    <div>
      {comments.map((comment) => {
        // 작성 시간 계산 로직
        const uploadDate = new Date(comment.created_at);
        const now = new Date();

        let timeText = "";
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
                {comment.replies.map((reply) => {
                  // 답글 작성 시간 계산 로직
                  const replyUploadDate = new Date(reply.created_at);
                  let replyTimeText = "";
                  if (differenceInDays(now, replyUploadDate) < 8) {
                    replyTimeText = formatDistanceToNow(replyUploadDate, {
                      addSuffix: true,
                      locale: ko,
                    }).replace(/^약 /, "");
                  } else {
                    replyTimeText = format(replyUploadDate, "yyyy년 MM월 dd일");
                  }

                  return (
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
                          <span className="mr-2 font-bold">
                            {reply.username}
                          </span>
                          <span className="text-[#222222] mr-1">
                            {reply.content}
                          </span>
                        </div>
                        <div className="mt-[5px] text-[rgba(34,34,34,0.5)] text-[12px] flex items-center">
                          <span className="mr-1">{replyTimeText}</span>
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
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CommentBox;
