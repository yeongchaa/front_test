//루트페이지, 전체 게시글 목록(스타일 모아보기 화면)

import SearchHeader from "@/components/post/SearchHeader";
import BottomNavigation from "@/components/common/BottomNavigation";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/** 검색창 헤더 */}
      <SearchHeader />

      <div className="flex-1 p-4">{/* 게시글 목록 컴포넌트 */}</div>

      {/** 하단 네비게이션 */}
      <div className="sticky bottom-0">
        <BottomNavigation />
      </div>
    </div>
  );
}
