// 좋아요 버튼 + 좋아요 수
import React, { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

interface LikeProps {
  size?: "small" | "large"; // 크기 타입
}

const Like: React.FC<LikeProps> = ({ size = "small" }) => {
  const [toggleHeart, setToggleHeart] = useState(false);
  // toggleHeart(현재 상태값) = false, setToggleHeart(상태를 변경할 수 있는 함수)
  const [count, setCount] = useState(0);
  // count(현재 상태값) = 0, setCount(상태를 변경할 수 있는 함수)

  // 크기에 따라 동적으로 Tailwind 클래스 설정
  const sizeClass = size === "small" ? "h-4 w-4" : "h-6 w-6"; // 삼항연산자
  const fontSize =
    size === "small"
      ? "text-[12px] text-[rgba(34,34,34,0.8)]"
      : "text-[13px] text-gray-800";

  const handleClick = () => {
    if (!toggleHeart) {
      setCount(count + 1); // toggleHeart가 true일 때, 숫자 증가
    } else {
      setCount(count - 1);
    }
    setToggleHeart(!toggleHeart);
  };

  return (
    <div onClick={handleClick} className="flex items-center cursor-pointer">
      {toggleHeart ? (
        <HeartIconSolid className={`${sizeClass} text-red-500`} />
      ) : (
        <HeartIcon className={`${sizeClass} text-gray-500`} />
      )}
      <span className={`${fontSize} pl-1`}>{count}</span>
    </div>
  );
};

export default Like;
