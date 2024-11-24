import React, { useState } from "react";

const EditableName: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false); // 이름 수정 모드
    const [name, setName] = useState("chachalee"); // 초기 이름
    const [savedName, setSavedName] = useState(name); // 저장된 이름

    const handleButtonClick = () => {
        setIsEditing(true); // 수정 모드 활성화
    };

    const handleCancelClick = () => {
        setIsEditing(false); // 수정 모드 비활성화
        setName(savedName); // 취소 시 이전 저장된 이름으로 복구
    }

    const handleSaveClick = () => {
        setIsEditing(false); // 수정 모드 비활성화
        setSavedName(name); // 저장 시 현재 입력된 이름을 저장
    }

    return (
        <div>
            <div className={`pt-[25px] pb-[12px] border-b ${isEditing ? "border-black" : "border-[#ebebeb]"}`}>
                {/* 이름 제목 */}
                <h5 className="text-[13px] text-[#626262]">이름</h5>
                {/* 입력 필드 및 버튼 */}
                <div className="flex items-center justify-between">
                    {/* 입력 필드 */}
                    {isEditing ? (
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="py-2 pr-[58px] text-sm focus:outline-none focus:border-none"
                            autoFocus
                        />
                    ) : (
                        <div className="py-2 pr-[58px] text-sm">
                            {name}
                        </div>
                    )}
                    {/* 버튼 */}
                    {isEditing ? (
                        <div className="flex space-x-1">
                            <button
                                onClick={handleCancelClick} // 취소 버튼 클릭 시
                                className="text-[12px] text-[#626262] px-[14px] h-[34px] border border-gray-300 rounded-[10px]">취소</button>
                            <button
                                onClick={handleSaveClick} // 저장 버튼 클릭 시
                                className="text-[12px] text-[#ffffff] bg-black px-[14px] h-[34px] border rounded-[10px]">저장</button>
                        </div>
                    ) : (
                        <button
                            onClick={handleButtonClick} // 수정 모드 진입
                            className="text-[12px] text-[#626262] px-[14px] h-[34px] border border-gray-300 rounded-[10px]">변경</button>
                    )}

                </div>
            </div>
        </div>
    );
};

export default EditableName;
