import React from "react";
import {Link, useNavigate} from "react-router-dom";
import { useEffect } from "react";
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { setLoginStatus } from '../store';
import { useUser } from "../contexts/UserContext.tsx"; // 방금 만든 액션
import { useAppDispatch} from "../hooks/hooks.ts";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn);
    const { username, setUsername } = useUser();

    const handleLoginClick = () => {
        navigate("/login")
    };

    const handleLogout = () => {
        dispatch(setLoginStatus(false)); // 로그아웃 시 로그인 상태를 false로 설정
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        navigate('/login'); // 로그인 페이지로 리다이렉트
    };

    // 새로고침 시 토큰 복원
    useEffect(() => {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");

        if (token === null || token === undefined || username === null || username === undefined) {
            navigate("/login");
        } else {
            dispatch(setLoginStatus(true));
            setUsername(username);
            navigate("/");
        }
    }, []);


    return (
        <header
            className="flex items-center justify-between bg-custom-gold-75 border-4 border-custom-gold p-4 col-span-3 text-left font-bold">
            <div className="text-lg font-bold w-1/4">
                <Link to="/">HJS</Link>
            </div>

            { /* 검색 입력란 */ }
            <div className="flex flex-1 text-lg font-bold">
                <input type="text" placeholder={"검색"} className={"placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500 text-black px-4 py-2 bg-white border-custom-gold border-1"}/>
            </div>
            <div className="ml-auto text-right w-1/4">
                {username}
                <button
                    onClick={handleLoginClick}
                    className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 transition text-sm">
                    {isLoggedIn && <button onClick={handleLogout}>로그아웃</button>}
                </button>
            </div>
        </header>
    );
};

export default Header;
