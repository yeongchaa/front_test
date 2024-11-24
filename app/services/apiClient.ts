// API 클라이언트 설정
import axios from "axios";

// Axios 기본 설정
const apiClient = axios.create({
    baseURL: "http://api4adc.cafe24app.com", // API 서버 주소
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;