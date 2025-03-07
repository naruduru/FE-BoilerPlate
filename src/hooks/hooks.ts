// hooks.ts
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/index.tsx';

// 커스텀 useDispatch 훅
export const useAppDispatch: () => AppDispatch = useDispatch;
