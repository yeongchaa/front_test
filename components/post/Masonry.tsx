import React from "react";
import Image from "next/image";
import Link from "next/link"; // 링크를 위한 import 추가

interface ImageData {
  id: number;
  src: string;
  alt: string;
  link?: string; // 링크는 선택적으로 추가
}

const images: ImageData[] = [
  { id: 1, src: "/img1.jpeg", alt: "Image 1", link: "/styles/post/page" },
  { id: 2, src: "/img2.jpeg", alt: "Image 2" },
  { id: 3, src: "/img3.jpeg", alt: "Image 3" },
  { id: 4, src: "/img4.jpeg", alt: "Image 4" },
  { id: 5, src: "/img5.jpeg", alt: "Image 5" },
  { id: 6, src: "/img6.jpeg", alt: "Image 6" },
  { id: 7, src: "/img7.jpeg", alt: "Image 7" },
  { id: 8, src: "/img8.jpeg", alt: "Image 8" },
  { id: 9, src: "/img9.jpeg", alt: "Image 9" },
  { id: 10, src: "/img10.jpeg", alt: "Image 10" },
  { id: 11, src: "/img11.jpeg", alt: "Image 11" },
  { id: 12, src: "/img12.jpeg", alt: "Image 12" },
];

const Masonry: React.FC = () => {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
      {images.map((image) => (
        <div
          key={image.id}
          className="relative w-full mb-4"
          style={{ aspectRatio: "auto" }}
        >
          {/* 링크가 있는 경우와 없는 경우를 조건부로 처리 */}
          {image.link ? (
            <Link href={image.link}>
              <Image
                src={image.src}
                alt={image.alt}
                layout="responsive"
                width={300}
                height={0}
                objectFit="cover"
                className="rounded-lg shadow-md"
              />
            </Link>
          ) : (
            <Image
              src={image.src}
              alt={image.alt}
              layout="responsive"
              width={300}
              height={0}
              objectFit="cover"
              className="rounded-lg shadow-md"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Masonry;
