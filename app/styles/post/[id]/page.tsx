"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import AuthorInfo from "@/components/post/AuthorInfo";
import CommentIcon from "@/components/post/CommentIcon";
import BackButton from "@/components/common/BackButton";
import HeaderTitle from "@/components/common/HeaderTitle";
import HashtagList from "@/components/post/HashtagList";
import SlideCarousel from "@/components/post/SlideCarousel";
import Like from "@/components/Masonry/like";
import CommentBox from "@/components/post/CommentBox";
//import { formatDistanceToNow, differenceInDays, format } from "date-fns";
//import { ko } from "date-fns/locale";

interface PostComment {
  id: string;
  content: string;
  created_at: string;
  username: string;
}

export default function PostDetailPage() {
  interface PostData {
    id: string;
    idx: number;
    user_id: string;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    username: string;
    like_count: number;
    like_users: string[];
    tags: string[];
    files: { file_path: string }[];
    comments: PostComment[];
  }
  const [postData, setPostData] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { data: session } = useSession();

  if (typeof id !== "string") {
    throw new Error("Invalid post ID");
  }

  const fetchPostDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/posts/${id}`);
      if (!response.ok) throw new Error("Failed to fetch post data");

      const data = await response.json();
      console.log("Fetched Post Data:", data); // 디버깅 로그 추가
      setPostData(data);
    } catch (err) {
      console.error("Error fetching post:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Fetching post details...");
    fetchPostDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, session]);

  if (loading) return <div>로딩 중...</div>;
  if (error || !postData) return <div>게시물을 불러올 수 없습니다.</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="h-[44px] flex items-center px-[16px] bg-white">
        <div className="flex item-center">
          <BackButton onBack={() => router.push("/")} />
        </div>
        <div className="flex-grow flex justify-center">
          <HeaderTitle title="게시물" />
        </div>
      </div>

      <div className="py-2 px-4">
        <AuthorInfo
          userName={postData.username}
          createdAt={postData.created_at}
          showTime={true}
          id={postData.id}
          authorId={postData.user_id}
        />
      </div>

      <div className="flex-1">
        <SlideCarousel
          images={postData.files.map(
            (file: { file_path: string }) => file.file_path
          )}
        />
      </div>

      <div className="py-3 px-4">
        <div className="flex items-center justify-end space-x-4">
          <Like
            size="large"
            postId={id}
            likeUsers={postData.like_users}
            initialCount={postData.like_count}
          />
          <CommentIcon />
        </div>

        <div className="pt-[13px]">
          <h2 className="text-[17px] font-bold">{postData.title}</h2>
          <p className="text-gray-700 mt-2 text-[14px]">{postData.content}</p>
        </div>

        <HashtagList
          hashtags={postData.tags.map((tag: string) => ({
            text: `#${tag}`,
            href: "#",
          }))}
        />
      </div>
      {/* 댓글 Section */}
      <div className="mt-[26px]">
        <div
          className="pt-2 border-t border-solid"
          style={{
            borderTopColor: "rgb(244, 244, 244)",
            borderTopWidth: "0.8px",
          }}
        >
          <div>
            comment_unit
            <CommentBox
              comments={[
                ...postData.comments.map((comment) => ({
                  ...(comment || []), // 기본값 추가
                })),
              ].sort(
                (a, b) =>
                  new Date(a.created_at).getTime() -
                  new Date(b.created_at).getTime()
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
