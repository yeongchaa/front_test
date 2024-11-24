import apiClient from "@/app/services/apiClient";

// 이메일로 사용자 정보 업데이트 API 호출 함수
export const updateUserByEmail = async (
  email: string,
  updateData: {
    username?: string;
    password?: string;
    profile_image_id?: string;
  }
): Promise<{
  message: string;
}> => {
  try {
    const response = await apiClient.put(`/users/${email}`, updateData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

// 이메일로 사용자 정보 조회 API 호출 함수
export const getUserByEmail = async (email: string): Promise<{
    id: string;
    username: string;
    email: string;
    roles: string[];
    profile_image_id: string;
    profile_image_url: string;
  }> => {
    try {
      // 기존의 apiClient를 재사용하여 GET 요청
      const response = await apiClient.get(`/users/${email}`);
      return response.data; // 서버 응답 데이터 반환
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message); // 에러 메시지 반환
      }
      throw new Error("알 수 없는 오류가 발생했습니다."); // 알 수 없는 에러 처리
    }
  };

// 이메일로 사용자 계정 삭제 API 호출 함수
export const deleteUserByEmail = async (email: string): Promise<{
    message: string;
  }> => {
    try {
      // DELETE 요청
      const response = await apiClient.delete(`/users/${email}`);
      return response.data; // 서버 응답 반환
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message); // 에러 메시지 반환
      }
      throw new Error("알 수 없는 오류가 발생했습니다."); // 알 수 없는 에러 처리
    }
  };

// 전체 사용자 정보 조회 API 호출 함수
export const getAllUsers = async (): Promise<
Array<{
  id: string;
  username: string;
  email: string;
  roles: string[];
  profile_image_id: string;
  profile_image_url: string;
}>
> => {
try {
  const response = await apiClient.get("/users"); // GET 요청
  return response.data; // 서버에서 받은 데이터 반환
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error("전체 사용자 정보 조회 실패:", error.message);
    throw new Error(error.message); // 에러 메시지 반환
  }
  throw new Error("알 수 없는 오류가 발생했습니다."); // 알 수 없는 에러 처리
}
};