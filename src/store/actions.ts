// src/store/actions.ts
export const setLoginStatus = (status: boolean) => {
    // 로컬 스토리지에 로그인 상태 저장
    localStorage.setItem('isLoggedIn', status.toString());
    return {
        type: 'SET_LOGIN_STATUS',
        payload: status,
    };
};
