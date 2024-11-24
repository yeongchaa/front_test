import apiClient from "./apiClient";

// 사용자 계정 생성 API 호출 함수
export const createUser = async (
  username: string,
  password: string,
  email: string,
  profileImageId: string
): Promise<{ message: string; userId: string }> => {
  try {
    const response = await apiClient.post("/api/users/signup", {
      username,
      password,
      email,
      profile_image_id: profileImageId,
    });

    return response.data; // 성공 응답 반환
  } catch (error) {
    // error를 명시적으로 처리
    if (error instanceof Error) {
      console.error("사용자 계정 생성 실패:", error.message);
      throw new Error(error.message);
    }

    // 에러가 객체가 아닐 경우 기본 메시지
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};
