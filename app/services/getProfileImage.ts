// 기본 이미지 ID 요청 함수
import axios from "axios";

export interface DefaultImageData {
  id: string;
  url: string;
}

export const getDefaultProfileImage = async (): Promise<DefaultImageData> => {
  const response = await axios.get("/api/upload/defaultProfile");
  return response.data;
};
