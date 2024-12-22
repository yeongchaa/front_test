import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const EditableName: React.FC = () => {
  const { data: session } = useSession(); // 세션 정보 가져오기
  const [isEditing, setIsEditing] = useState(false); // 이름 수정 모드
  const [name, setName] = useState(""); // 초기 이름
  const [savedName, setSavedName] = useState(""); // 저장된 이름
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  // 세션에서 이메일 가져오기
  const userEmail = session?.user?.email;

  // API 호출로 사용자 이름 불러오기
  useEffect(() => {
    if (!userEmail) {
      setError("사용자 이메일을 확인할 수 없습니다.");
      setLoading(false);
      return;
    }

    const fetchUserByEmail = async () => {
      try {
        const response = await fetch(`/api/users/${encodeURIComponent(userEmail)}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user data. Status: ${response.status}`);
        }

        const data = await response.json();
        setName(data.username); // 불러온 사용자 이름 설정
        setSavedName(data.username); // 초기 저장 이름 설정
      } catch (err: any) {
        console.error("Error fetching username:", err);
        setError(err.message || "사용자 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchUserByEmail();
  }, [userEmail]);

  const handleButtonClick = () => {
    setIsEditing(true); // 수정 모드 활성화
  };

  const handleCancelClick = () => {
    setIsEditing(false); // 수정 모드 비활성화
    setName(savedName); // 취소 시 이전 저장된 이름으로 복구
  };

  const handleSaveClick = async () => {
    try {
      if (!userEmail) throw new Error("User email is not defined");

      // 저장 API 호출
      const response = await fetch(`/api/users/${encodeURIComponent(userEmail)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save username. Status: ${response.status}`);
      }

      const data = await response.json();
      setSavedName(data.username); // 서버에서 저장된 이름 갱신
    } catch (err: any) {
      console.error("Error saving username:", err);
      setError(err.message || "이름 저장 중 오류가 발생했습니다.");
    } finally {
      setIsEditing(false); // 수정 모드 비활성화
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="pt-[25px] pb-[12px]">
        {/* 이름 제목 */}
        <h5 className="text-[13px] text-[#626262]">프로필 이름</h5>

        {/* 입력 필드 */}
        <div className="flex flex-col border-b border-[#ebebeb]">
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="py-2 text-sm focus:outline-none focus:border-none w-full"
              autoFocus
            />
          ) : (
            <div className="flex items-center justify-between">
              <div className="py-2 text-sm">{name}</div>
              <button
                onClick={handleButtonClick} // 수정 모드 진입
                className="text-[12px] text-[#626262] px-[14px] h-[34px] border border-gray-300 rounded-[10px]"
              >
                변경
              </button>
            </div>
          )}
        </div>

        {/* 안내 문구 */}
        {isEditing && (
          <p className="text-[11px] text-[#999999] mt-2">
            변경 후 30일이 지나야 다시 변경 가능하므로 신중히 변경해주세요.
          </p>
        )}

        {/* 버튼 영역 */}
        {isEditing && (
          <div className="flex justify-center space-x-2 mt-4">
            <button
              onClick={handleCancelClick} // 취소 버튼 클릭 시
              className="text-[13px] text-[#262626] bg-white border border-[#dbdbdb] px-[38px] h-[40px] rounded-[10px]"
            >
              취소
            </button>
            <button
              onClick={handleSaveClick} // 저장 버튼 클릭 시
              className="text-[13px] text-white bg-black px-[38px] h-[40px] rounded-[10px]"
            >
              저장
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditableName;
