import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { setLoginStatus } from '../store'; // 방금 만든 액션
import { useDispatch } from 'react-redux';
import {Dispatch} from "redux";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { setUsername } = useUser();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<Dispatch>();  // dispatch 타입 명시

    const handleLoginClick = () => {
        navigate("/signup")
    };

    const handleLogin = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://10.11.64.94:8080/api/v1/auth/login/normal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // 성공 시 토큰 저장 (예: 로컬 스토리지)
            localStorage.setItem('token', data.data.accessToken);
            localStorage.setItem('username', data.data.memberResponse.email);

            setUsername(email)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            dispatch(setLoginStatus(true)); // 로그인 성공 시 로그인 상태를 true로 설정
            // 로그인 후 리다이렉트 또는 화면 전환 로직 추가
            navigate("/")
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-4">로그인</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}
                    className="space-y-4"
                >
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            아이디
                        </label>
                        <input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="이메일을 입력하세요"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            비밀번호
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="비밀번호를 입력하세요"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    {/* Login Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition"
                        >
                            {loading ? '로그인 중...' : '로그인'}
                        </button>
                    </div>
                </form>

                {/* Additional Links */}
                <div className="mt-4 text-sm text-center text-gray-600">
                    계정이 없으신가요?{" "}
                    <button
                        onClick={handleLoginClick}
                        className="text-blue-500 hover:underline">
                        회원가입
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login;