"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import CommentInput from "@/components/post/CommentInput";
import AuthorInfo from "@/components/post/AuthorInfo";
import CommentIcon from "@/components/post/CommentIcon";
import BackButton from "@/components/common/BackButton";
import HeaderTitle from "@/components/common/HeaderTitle";
import HashtagList from "@/components/post/HashtagList";
import SlideCarousel from "@/components/post/SlideCarousel";
import Like from "@/components/Masonry/like";
import CommentBox from "@/components/post/CommentBox";

export default function PostDetailPage() {
  const [postData, setPostData] = useState<any>(null);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [comment, setComment] = useState("");

  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const { data: session } = useSession();

  // id가 유효한 string인지 확인
  if (typeof id !== "string") {
    throw new Error("Invalid post ID");
  }

  const handleChange = (value: string) => {
    setComment(value);
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      console.warn("댓글 내용이 비어 있습니다.");
      return;
    }

    if (!session) {
      alert("로그인이 필요합니다.");
      router.push("/auth/login");
      return;
    }

    try {
      const response = await fetch(`/api/posts/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`, // 세션에서 가져온 토큰 사용
        },
        body: JSON.stringify({
          content: comment.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("댓글 등록 실패");
      }

      console.log("댓글 등록 성공");
      setComment(""); // 입력 필드 초기화
    } catch (err) {
      console.error("댓글 등록 에러:", err);
    }
  };

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) throw new Error("Failed to fetch post data");

        const data = await response.json();
        setPostData(data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostDetail();
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (error || !postData) return <div>게시물을 불러올 수 없습니다.</div>;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="h-[44px] flex items-center px-[16px] bg-white">
        <div className="flex item-center">
          <BackButton onBack={() => router.back()} />
        </div>
        <div className="flex-grow flex justify-center">
          <HeaderTitle title="게시물" />
        </div>
      </div>

      {/* 작성자 정보 */}
      <div className="py-2 px-4">
        <AuthorInfo
          userName={postData.username}
          createdAt={postData.created_at}
          showTime={true}
        />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1">
        <SlideCarousel
          images={postData.files.map(
            (file: { file_path: string }) => file.file_path
          )}
        />
      </div>

      {/* 좋아요 버튼 */}
      <div className="py-3 px-4">
        <div className="flex items-center justify-end space-x-4">
          <Like
            size="large"
            postId={id}
            initialLiked={postData.liked}
            initialCount={postData.like_count}
          />
          <CommentIcon />
        </div>

        {/* 제목 + 내용 */}
        <div className="pt-[13px]">
          <h2 className="text-xl font-bold">{postData.title}</h2>
          <p className="text-gray-700 mt-2">{postData.content}</p>
        </div>

        {/* 해시태그 리스트 */}
        <HashtagList
          hashtags={postData.tags.map((tag: string) => ({
            text: `#${tag}`,
            href: "#",
          }))}
        />
      </div>

      {/* 댓글 영역 */}
      <div className="p-4 border-t border-b border-gray-300 bg-white">
        {postData.comments && postData.comments.length > 0 ? (
          postData.comments.map((comment: any, index: number) => (
            <CommentBox
              key={index}
              userName={comment.username}
              content={comment.content}
              uploadTime={comment.upload_time}
              likes={comment.likes}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">
            아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
          </p>
        )}
      </div>

      {/* 댓글 입력 컴포넌트 */}
      <div className="bg-white p-4 border-t border-gray-300">
        <CommentInput
          onChange={handleChange}
          value={comment}
          onSubmit={handleCommentSubmit}
        />
      </div>
    </div>
  );
}
