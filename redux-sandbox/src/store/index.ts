import {configureStore} from '@reduxjs/toolkit';
import nodeReducer from './nodeSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    nodes: nodeReducer
  }
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;