import React from "react";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/outline";
import { format, formatDistanceToNow, differenceInDays } from "date-fns";
import { ko } from "date-fns/locale";

interface PostComment {
  id: string;
  content: string;
  created_at: string;
  username: string;
}

interface CommentBoxProps {
  comments: PostComment[];
}

const CommentBox: React.FC<CommentBoxProps> = ({ comments }) => {
  return (
    <div className="py-3 px-4">
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
          <div key={comment.id} className="flex">
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
              <div className="mt-[6px] text-[rgba(34,34,34,0.5)] text-[12px]">
                <span className="mr-1">{timeText}</span>
                <span className="mr-1"> • </span>
                <a className="mr-1">
                  좋아요 <strong>1</strong>개
                </a>
                <a className="ml-2 mr-3 font-bold">답글쓰기</a>
              </div>
            </div>
            <div className="ml-auto pl-[5px]">
              <HeartIcon className="w-7 h-7 text-gray-400" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentBox;
