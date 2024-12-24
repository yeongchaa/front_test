"use client";

import { useState, useEffect, useCallback } from "react";
import SearchHeader from "@/components/post/SearchHeader";
import BottomNavigation from "@/components/common/BottomNavigation";
import Sort from "@/components/common/Sort";
import PostCardGrid from "@/components/Masonry/PostCardGrid";
import { PostCardProps } from "@/components/Masonry/PostCard";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [posts, setPosts] = useState<PostCardProps[]>([]); // 게시글 데이터
  const [nextPage, setNextPage] = useState<number | null>(1); // 다음 페이지 번호
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [isFetching, setIsFetching] = useState(false); // 무한 스크롤 상태
  const router = useRouter();

  // 게시글 데이터를 가져오는 함수
  const fetchPosts = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/posts?page=${page}`);
      const data = await response.json();

      if (!data.posts || !Array.isArray(data.posts)) {
        console.error("API 응답이 예상된 형식이 아닙니다:", data);
        return;
      }

      const formattedData: PostCardProps[] = data.posts.map((item: any) => {
        const textToDisplay =
          item.title || item.content || item.tags?.join(", ");

        const firstImage = item.files?.[0]?.file_path
          ? item.files[0].file_path.startsWith("http")
            ? item.files[0].file_path
            : `https://your-server.com${item.files[0].file_path}`
          : "/img5.jpeg";

        return {
          socialImg: { src: firstImage, alt: "게시글 이미지" },
          cardDetail: {
            profileImage: {
              src: item.profile_image_url || "/default.png",
              alt: "프로필 이미지",
            },
            userName: { text: item.username, type: "small" },
            like: { size: "small", postId: item.id },
            textBox: { text: textToDisplay },
          },
          type: item.type,
          style: item.style,
          id: item.id, // postId 전달
        };
      });

      setPosts((prevPosts) => [...prevPosts, ...formattedData]);
      setNextPage(data.nextPage || null);
    } catch (error) {
      console.error("데이터를 불러오지 못했습니다:", error);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  // 스크롤 이벤트 처리 함수
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200 &&
      !loading &&
      nextPage !== null
    ) {
      setIsFetching(true);
    }
  }, [loading, nextPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (isFetching && nextPage !== null) {
      fetchPosts(nextPage);
    }
  }, [isFetching, nextPage]);

  useEffect(() => {
    if (nextPage !== null) {
      fetchPosts(nextPage);
    }
  }, []);

  // 게시글 클릭 시 상세 페이지로 이동
  const handlePostClick = (postId: string) => {
    console.log("HomePage: Post clicked", postId);
    router.push(`/styles/post/${postId}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SearchHeader />
      <Sort />
      <div className="flex-1 px-4 pb-4">
        <PostCardGrid posts={posts} onPostClick={handlePostClick} />
        {loading && (
          <p className="text-center text-gray-500 mt-4">로딩 중...</p>
        )}
      </div>
      <div className="sticky bottom-0">
        <BottomNavigation />
      </div>
    </div>
  );
}
