import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const EditableName: React.FC = () => {
  const { data: session } = useSession(); // 세션 정보 가져오기
  const [isEditing, setIsEditing] = useState(false); // 이름 수정 모드
  const [name, setName] = useState(""); // 초기 이름
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  const userEmail = session?.user?.email;

  useEffect(() => {
    if (!userEmail) {
      setError("사용자 이메일을 확인할 수 없습니다.");
      setLoading(false);
      return;
    }

    const fetchUserByEmail = async () => {
      try {
        const response = await fetch(`/api/users/${userEmail}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken || ""}`, // 인증 헤더 추가
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch user data. Status: ${response.status}`
          );
        }

        const data = await response.json();
        setName(data.username); // 불러온 사용자 이름 설정
      } catch (err: any) {
        console.error("Error fetching username:", err);
        setError(
          err.message || "사용자 정보를 불러오는 중 오류가 발생했습니다."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserByEmail();
  }, [userEmail, session]);

  const handleSaveClick = async () => {
    try {
      if (!userEmail) throw new Error("User email is not defined");

      const response = await fetch(`/api/users/${userEmail}`, {
        method: "PUT", // PUT 메서드 사용
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken || ""}`, // 인증 헤더 추가
        },
        body: JSON.stringify({ username: name }), // 요청 본문에 username 포함
      });

      if (!response.ok) {
        throw new Error(`Failed to save username. Status: ${response.status}`);
      }

      console.log("이름 저장 성공");
      setIsEditing(false);
    } catch (err: any) {
      console.error("Error saving username:", err);
      setError(err.message || "이름 저장 중 오류가 발생했습니다.");
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      className={`pt-[25px] pb-3 ${
        isEditing ? "" : "border-b border-gray-300"
      }`}
    >
      <h5 className="text-[13px] text-[rgba(34,34,34,.5)] mb-2">프로필 이름</h5>
      <div className="flex items-center justify-between">
        {isEditing ? (
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="py-2 pr-[58px] text-[rgba(34,34,34,.85)] border-b border-black  w-full mr-4"
            />
            <p className="text-[rgba(34,34,34,.5)] text-[11px]">
              변경 후 30일이 지나야 다시 변경 가능하므로 신중히 변경해주세요.
            </p>
          </div>
        ) : (
          <p className="py-2 pr-[58px] text-[rgba(34,34,34,.85)]">{name}</p>
        )}
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn_modify outlinegrey text-[rgba(34,34,34,.8)] small border border-[#ebebeb] rounded-md h-[34px] px-[14px] text-[12px]"
          >
            변경
          </button>
        )}
      </div>
      <div
        className={`modify ${
          isEditing ? "flex" : "hidden"
        } justify-center mt-2`}
      >
        <button
          onClick={() => setIsEditing(false)}
          className="bg-white text-black border border-gray-300 rounded-[10px] px-[38px] h-[42px] text-[14px] mr-4"
        >
          취소
        </button>
        <button
          onClick={handleSaveClick}
          className="bg-black text-white rounded-[10px] px-[38px] h-[42px] text-[14px] font-bold"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default EditableName;
