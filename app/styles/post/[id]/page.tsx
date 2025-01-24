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
import CommentInput from "@/components/post/CommentInput";

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
  const [newComment, setNewComment] = useState(""); // 댓글 입력값 상태

  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { data: session } = useSession();

  if (typeof id !== "string") {
    throw new Error("Invalid post ID");
  }
  useEffect(() => {
    console.log("Initial postData:", postData); // 초기 상태
  });
  const fetchPostDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/posts/${id}`);
      if (!response.ok) throw new Error("Failed to fetch post data");

      const data = await response.json();
      console.log("Fetched post data:", data); // 데이터 확인
      setPostData(data);
    } catch (err) {
      console.error("Error fetching post:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentChange = (value: string) => {
    if (!session) {
      alert("로그인이 필요합니다."); // 로그인 필요 경고
      router.push("/auth/login"); // 로그인 페이지로 이동
      return;
    }
    setNewComment(value);
  };

  const handleCommentSubmit = async () => {
    console.log("handleCommentSubmit called");
    if (!session) {
      alert("로그인이 필요합니다.");
      router.push("/auth/login");
      return;
    }

    if (newComment.trim() === "") {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    const tempComment: PostComment = {
      id: `temp-${Date.now()}`, // 임시 ID 생성
      content: newComment,
      created_at: new Date().toISOString(),
      username: session.user?.id || "", // 세션에서 사용자 이름 가져오기
    };

    console.log("Temp comment created:", tempComment);

    // 서버 응답 기반으로 댓글 추가
    console.log("Before setPostData");
    setPostData((prevData) => {
      console.log("prevData in setPostData:", prevData);
      const updatedData = prevData
        ? {
            ...prevData,
            comments: [...prevData.comments, tempComment],
          }
        : prevData;

      console.log("Updated postData (after optimistic update):", updatedData);
      return updatedData;
    });

    setNewComment(""); // 입력 필드 초기화

    try {
      // 댓글을 서버로 전송하는 API 요청
      const response = await fetch(`/api/posts/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(tempComment),
      });

      if (!response.ok) {
        throw new Error("댓글 등록에 실패했습니다."); // API 요청 실패 처리
      }

      const result = await response.json(); // 서버에서 받은 댓글 데이터

      // 서버 응답 기반으로 임시 댓글을 실제 댓글로 대체
      setPostData((prevData) =>
        prevData
          ? {
              ...prevData,
              comments: prevData.comments.map((comment) =>
                comment.id === tempComment.id ? result : comment
              ),
            }
          : prevData
      );
    } catch (error) {
      console.error("Error submitting comment:", error);

      // **롤백 처리**: 서버 요청 실패 시 임시 댓글 제거
      setPostData((prevData) =>
        prevData
          ? {
              ...prevData,
              comments: prevData.comments.filter(
                (comment) => comment.id !== tempComment.id
              ),
            }
          : prevData
      );
      alert("댓글 등록 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchPostDetail();
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
          {postData.comments.length === 0 ? (
            <div className="text-[13px] py-8 text-center">
              <p className="text-[rgba(34,34,34,0.7)]">
                첫번째로 댓글을 남겨보세요.
              </p>
              <button className="px-[10px] py-[7px] mt-[10px] border border-black rounded-[10px]">
                댓글쓰기
              </button>
            </div>
          ) : (
            <div>
              <CommentBox
                key={postData.comments.length} // 상태 변경에 따라 강제 렌더링
                postId={id}
                comments={[...postData.comments].sort(
                  (a, b) =>
                    new Date(a.created_at).getTime() -
                    new Date(b.created_at).getTime()
                )}
              />
            </div>
          )}
        </div>

        <CommentInput
          value={newComment}
          onChange={handleCommentChange}
          onSubmit={handleCommentSubmit}
        />
      </div>
    </div>
  );
}
