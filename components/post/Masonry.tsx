import React from "react";
import Image from "next/image";
import Link from "next/link"; // 링크를 위한 import 추가

interface ImageData {
  id: number;
  src: string;
  alt: string;
  link?: string; // 링크는 선택적으로 추가
  profileSrc: string;
  username: string;
  likes: number;
  description: string;
}

const images: ImageData[] = [
  {
    id: 1,
    src: "/img1.jpeg",
    alt: "Image 1",
    link: "/styles/post/page",
    profileSrc: "/default.png",
    username: "kream",
    likes: 202,
    description: "이 아이템을 아세요? #슈노우 챌린지....",
  },
  {
    id: 2,
    src: "/img2.jpeg",
    alt: "Image 2",
    profileSrc: "/default.png",
    username: "kream",
    likes: 202,
    description: "이 아이템을 아세요? #슈노우 챌린지....",
  },
  {
    id: 3,
    src: "/img3.jpeg",
    alt: "Image 3",
    profileSrc: "/default.png",
    username: "kream",
    likes: 202,
    description: "이 아이템을 아세요? #슈노우 챌린지....",
  },
  {
    id: 4,
    src: "/img4.jpeg",
    alt: "Image 4",
    profileSrc: "/default.png",
    username: "kream",
    likes: 202,
    description: "이 아이템을 아세요? #슈노우 챌린지....",
  },
  {
    id: 5,
    src: "/img5.jpeg",
    alt: "Image 5",
    profileSrc: "/default.png",
    username: "kream",
    likes: 202,
    description: "이 아이템을 아세요? #슈노우 챌린지....",
  },
  {
    id: 6,
    src: "/img6.jpeg",
    alt: "Image 6",
    profileSrc: "/default.png",
    username: "kream",
    likes: 202,
    description: "이 아이템을 아세요? #슈노우 챌린지....",
  },
  {
    id: 7,
    src: "/img7.jpeg",
    alt: "Image 7",
    profileSrc: "/default.png",
    username: "kream",
    likes: 202,
    description: "이 아이템을 아세요? #슈노우 챌린지....",
  },
  {
    id: 8,
    src: "/img8.jpeg",
    alt: "Image 8",
    profileSrc: "/default.png",
    username: "kream",
    likes: 202,
    description: "이 아이템을 아세요? #슈노우 챌린지....",
  },
  {
    id: 9,
    src: "/img9.jpeg",
    alt: "Image 9",
    profileSrc: "/default.png",
    username: "kream",
    likes: 202,
    description: "이 아이템을 아세요? #슈노우 챌린지....",
  },
  {
    id: 10,
    src: "/img10.jpeg",
    alt: "Image 10",
    profileSrc: "/default.png",
    username: "kream",
    likes: 202,
    description: "이 아이템을 아세요? #슈노우 챌린지....",
  },
  {
    id: 11,
    src: "/img11.jpeg",
    alt: "Image 11",
    profileSrc: "/default.png",
    username: "kream",
    likes: 202,
    description: "이 아이템을 아세요? #슈노우 챌린지....",
  },
  {
    id: 12,
    src: "/img12.jpeg",
    alt: "Image 12",
    profileSrc: "/default.png",
    username: "kream",
    likes: 202,
    description: "이 아이템을 아세요? #슈노우 챌린지....",
  },
];

const Masonry: React.FC = () => {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
      {images.map((image) => (
        <div
          key={image.id}
          className="w-full mb-6 bg-white shadow-md rounded-lg overflow-hidden"
        >
          {/* 이미지 섹션 */}
          <div className="relative">
            {image.link ? (
              <Link href={image.link}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  layout="responsive"
                  width={300}
                  height={200}
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </Link>
            ) : (
              <Image
                src={image.src}
                alt={image.alt}
                layout="responsive"
                width={300}
                height={200}
                objectFit="cover"
                className="rounded-t-lg"
              />
            )}
          </div>

          {/* 프로필, 좋아요, 설명 섹션 */}
          <div className="p-4">
            {/* 프로필 정보 */}
            <div className="flex items-center mb-2">
              <Image
                src={image.profileSrc}
                alt={`${image.username} 프로필`}
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="ml-2 font-semibold text-sm">
                {image.username}
              </span>
            </div>

            {/* 설명 텍스트 */}
            <p className="text-sm text-gray-600 mb-2">{image.description}</p>

            {/* 좋아요 섹션 */}
            <div className="flex items-center">
              <button className="text-red-500 hover:text-red-600 focus:outline-none">
                ❤️
              </button>
              <span className="ml-2 text-sm">{image.likes}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Masonry;
