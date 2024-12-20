import React, { useState } from "react";
import Image from "next/image";

interface PhotoUploadProps {
  onFileUpload: (file: File) => Promise<void>;
}

export default function PhotoUpload({ onFileUpload }: PhotoUploadProps) {
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const newThumbnails = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setThumbnails((prevThumbnails) => [...prevThumbnails, ...newThumbnails]);

      // 파일 업로드 API 호출
      for (const file of files) {
        await onFileUpload(file);
      }
    }
  };

  const removeThumbnail = (index: number) => {
    setThumbnails((prevThumbnails) =>
      prevThumbnails.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      {thumbnails.map((src, index) => (
        <div
          key={index}
          className="w-[100px] h-[100px] border border-gray-300 rounded-md overflow-hidden relative"
        >
          <Image
            src={src}
            alt={`Thumbnail ${index}`}
            fill
            style={{ objectFit: "cover" }}
            unoptimized
          />
          <button
            onClick={() => removeThumbnail(index)}
            className="absolute top-1 right-1 bg-gray-800 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
          >
            ✕
          </button>
        </div>
      ))}

      {/* 파일 선택 */}
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
