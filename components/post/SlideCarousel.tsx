import React, { useState } from "react";
import Image from "next/image";

interface SlideCarouselProps {
  images: string[]; // 이미지 배열
}

const SlideCarousel: React.FC<SlideCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 이미지가 1개일 경우 캐러셀 비활성화
  if (images.length === 1) {
    return (
      <div className="w-full h-0 pb-[100%] relative">
        <Image
          src={images[0]}
          alt="Single Slide"
          layout="fill"
          objectFit="cover"
        />
      </div>
    );
  }

  // 이전 슬라이드로 이동
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // 다음 슬라이드로 이동
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full group">
      {/* 슬라이드 이미지 */}
      <div className="w-full h-0 pb-[100%] relative">
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* 좌측 버튼 */}
      <button
        onClick={prevSlide}
        className={`absolute left-2 top-1/2 transform -translate-y-1/2 focus:outline-none transition-opacity duration-300 ${
          currentIndex === 0
            ? "opacity-0 pointer-events-none" // 첫 번째 사진일 때 숨김
            : "opacity-0 group-hover:opacity-100 pointer-events-auto"
        }`}
      >
        <Image
          src="/arr-left-circle.svg" // 좌측 버튼 이미지 경로
          alt="Previous"
          width={67}
          height={67}
        />
      </button>

      {/* 우측 버튼 */}
      <button
        onClick={nextSlide}
        className={`absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none transition-opacity duration-300 ${
          currentIndex === images.length - 1
            ? "opacity-0 pointer-events-none" // 마지막 사진일 때 숨김
            : "opacity-0 group-hover:opacity-100 pointer-events-auto"
        }`}
      >
        <Image
          src="/arr-right-circle.svg" // 우측 버튼 이미지 경로
          alt="Next"
          width={67}
          height={67}
        />
      </button>

      {/* 하단 점 표시 */}
      <div className="mt-4 mb-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1.5 h-1.5 rounded-full ${
              currentIndex === index ? "bg-gray-800" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SlideCarousel;
