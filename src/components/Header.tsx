import React from "react";
import {Link, useNavigate} from "react-router-dom";
import { useEffect } from "react";
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginStatus } from '../store'; // 방금 만든 액션

const Header: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.isLoggedIn);

    const handleLoginClick = () => {
        navigate("/login")
    };

    const handleLogout = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        dispatch(setLoginStatus(false)); // 로그아웃 시 로그인 상태를 false로 설정
        navigate('/login'); // 로그인 페이지로 리다이렉트
    };

    // 새로고침 시 토큰 복원
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token === null || token === undefined) {
            navigate("/login");
        } else {
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
                <button
                    onClick={handleLoginClick}
                    className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 transition text-sm">
                    <h1>{isLoggedIn ? '로그인됨' : '로그인 안됨'}</h1>
                    {isLoggedIn && <button onClick={handleLogout}>로그아웃</button>}
                </button>
            </div>
        </header>
    );
};

export default Header;
