import React, { useState } from "react";
import Image from "next/image";

export default function PhotoUpload() {
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newThumbnails = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setThumbnails((prevThumbnails) => [...prevThumbnails, ...newThumbnails]);
    }
  };

  const removeThumbnail = (index: number) => {
    setThumbnails((prevThumbnails) =>
      prevThumbnails.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      {/* 썸네일 리스트 */}
      {thumbnails.map((src, index) => (
        <div
          key={index}
          className="w-[100px] h-[100px] border border-gray-300 rounded-md overflow-hidden relative"
        >
          <Image
            src={src}
            alt={`Thumbnail ${index}`}
            layout="fill"
            objectFit="cover"
            unoptimized
          />
          {/* 삭제 버튼 */}
          <button
            onClick={() => removeThumbnail(index)}
            className="absolute top-1 right-1 bg-gray-800 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
          >
            ✕
          </button>
        </div>
      ))}

      {/* 사진 업로드 버튼 */}
      <label
        htmlFor="photo-upload"
        className="w-[100px] h-[100px] bg-gray-300 flex items-center justify-center text-white font-bold text-2xl cursor-pointer rounded-md"
      >
        +
        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
}
