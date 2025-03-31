import React from "react";
import { Outlet } from "react-router-dom";

const FullscreenLayout: React.FC = () => {
    return (
        <div className="w-full h-screen">
            {/* 전체 화면 콘텐츠 */}
            <Outlet />
        </div>
    );
};

export default FullscreenLayout;