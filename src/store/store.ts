import { configureStore, createSelector} from '@reduxjs/toolkit'
import {useDispatch, useSelector} from "react-redux";
import {users, usersSlice} from "../moduls/users/users.slice.tsx";
import {counterReducer} from "../moduls/counters/counters.slice.tsx";

export const store = configureStore({
    reducer: {
        counters: counterReducer,
        [usersSlice.name]: usersSlice.reducer
    },
})
store.dispatch(usersSlice.actions.stored({users}))


export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppState>();
export const createAppSelector = createSelector.withTypes<AppState>();

