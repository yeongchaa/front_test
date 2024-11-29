import axios from "axios";

export const createUser = async (
  username: string,
  password: string,
  email: string,
  profileImageId: string
): Promise<{ message: string; userId: string }> => {
  try {
    const response = await axios.post(`/api/users/signup`, {
      username,
      password,
      email,
      profile_image_url: profileImageId, // 프로필 이미지 경로 전달
    });

    // 성공 시 응답 데이터 반환
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data.message || "회원가입에 실패했습니다."
        );
      }
    }
    throw new Error("서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
  }
};
