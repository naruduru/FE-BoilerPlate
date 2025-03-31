import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);  // 파일 상태 추가

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    // handleSubmit 함수에서 이벤트 객체의 타입을 명시적으로 지정
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 비밀번호 확인
        if (password !== confirmPassword) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
            return;
        }

        setLoading(true);

        // FormData 객체 생성
        const formData = new FormData();

        // JSON 데이터를 추가
        formData.append("signUpRequest", new Blob([JSON.stringify({
            email,
            password,
            confirmPassword,
        })], { type: "application/json" }));

        // 파일 데이터를 추가 (파일이 있을 경우)
        if (file) {
            formData.append("multipartFile", file);
        }

        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/signup/normal', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                console.log('회원가입 성공', data);
                // 회원가입 성공 후 로그인 페이지로 리다이렉트
                navigate('/login');
            } else {
                setErrorMessage(data.message || '회원가입 실패');
            }
        } catch (error) {
            setErrorMessage('서버에 문제가 발생했습니다.' + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">회원가입</h2>

                {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            이메일 주소
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} // 타입 지정
                            required
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            비밀번호
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} // 타입 지정
                            required
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            비밀번호 확인
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} // 타입 지정
                            required
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <input
                        type="file"
                        onChange={handleFileChange}  // 파일 선택 처리
                    />
                    <button
                        type="submit"
                        className={`w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? '회원가입 중...' : '회원가입'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                    이미 계정이 있나요? <a href="/login" className="text-blue-500 hover:underline">로그인</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
