// (공통)
// 하단 네비게이션 전체
// 전체 네비게이션 바의 레이아웃을 관리하며, 각 아이템을 배열 형태로 순회하여 렌더링한다.
"use client";

import React from "react";
import BottomLinkIcon from "./BottomLinkIcon";
import { usePathname } from "next/navigation"; // 현재 경로 확인용

const BottomNavigation: React.FC = () => {
  const pathname = usePathname(); // 현재 경로 가져오기

  // 네비게이션 아이템 배열
  const navItems = [
    {
      imageSrc: "/bottom-home.svg",
      activeImageSrc: "/bottom-home.svg",
      text: "HOME",
      href: "/",
    },
    {
      imageSrc: "/bottom-style-off.svg",
      activeImageSrc: "/bottom-style-on.svg",
      text: "STYLE",
      href: "/",
    },
    {
      imageSrc: "/bottom-shop.svg",
      activeImageSrc: "/bottom-shop-on.svg",
      text: "SHOP",
      href: "/shop",
    },
    {
      imageSrc: "/bottom-saved.svg",
      activeImageSrc: "/bottom-saved-on.svg",
      text: "SAVED",
      href: "/saved",
    },
    {
      imageSrc: "/bottom-my-off.svg",
      activeImageSrc: "/bottom-my-on.svg",
      text: "MY",
      href: "/profile/mypage",
    },
  ];

  return (
    <div className="flex justify-around items-center bg-white h-[60px] border-t border-gray-300">
      {/* 각 네비게이션 아이템 렌더링 */}
      {navItems.map((item, index) => (
        <BottomLinkIcon
          key={index}
          imageSrc={item.imageSrc}
          activeImageSrc={item.activeImageSrc}
          text={item.text}
          href={item.href}
          isActive={pathname === item.href} // 현재 경로와 일치하는지 확인
        />
      ))}
    </div>
  );
};

export default BottomNavigation;
