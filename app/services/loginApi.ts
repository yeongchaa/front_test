// 로그인 API
import apiClient from "./apiClient";
import { AxiosError } from "axios";

// 로그인 API 호출 함수
export const login = async (email: string, password: string) => {
    try {
        const response = await apiClient.post("/user/login", {
            email,
            password,
        });
        // 성공적으로 로그인하면 응답 데이터를 반환
        const {message, token, user}=response.data;
        console.log("로그인 성공:", message);
        return { token, user }; // 토큰과 사용자 정보 반환
    } catch (error: unknown){
        if (error instanceof AxiosError && error.response?.status === 401) {
            console.error("인증 실패:", error.response.data.message);
            throw new Error(error.response.data.message); // 인증 실패 메시지 던짐
        } else {
            console.error("로그인 중 알 수 없는 오류 발생:", error);
            throw new Error("로그인 중 오류가 발생");
        }
    };
}