import { createStore } from 'redux';

// 1. 로그인 상태를 관리하는 액션 타입
const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';

// 2. 초기 상태 설정
interface State {
    isLoggedIn: boolean;
}

const initialState: State = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false, // 로컬 스토리지에서 상태 초기화
};



// 3. 액션 생성 함수
export interface SetLoginStatusAction {
    type: typeof SET_LOGIN_STATUS;
    payload: boolean;
}

export type Action = SetLoginStatusAction;

// 4. 리듀서 정의
const loginReducer = (state = initialState, action: any): State => {
    switch (action.type) {
        case SET_LOGIN_STATUS:
            return {
                ...state,
                isLoggedIn: action.payload,
            };
        default:
            return state;
    }
};

// 5. Redux 스토어 생성
const store = createStore(loginReducer);


// RootState 타입 정의
export type RootState = ReturnType<typeof store.getState>;

export default store;

// 6. 액션 생성 함수 (로그인 상태 변경)
export const setLoginStatus = (status: boolean): SetLoginStatusAction => ({
    type: SET_LOGIN_STATUS,
    payload: status,
});
