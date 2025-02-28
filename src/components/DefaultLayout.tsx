import Header from "./Header.tsx";
import Sidebar from "./Sidebar.tsx";
import Footer from "./Footer.tsx";
import React from "react";
import {Outlet} from "react-router-dom";

const DefaultLayout: React.FC = () => {
    return (
        <div className="flex flex-col h-screen overflow-hidden min-w-[800px] min-h-[600px]">
            {/* 헤더 */}
            <Header/>

            <div className="flex flex-1 overflow-hidden">
                {/* 왼쪽 사이드바 */}
                <Sidebar position="left"/>

                {/* 콘텐츠 영역 */}
                <Outlet/>

                {/* 오른쪽 사이드바 */}
                <Sidebar position="right"/>
            </div>

            {/* 풋터 */}
            <Footer/>
        </div>
    )
};

export default DefaultLayout;