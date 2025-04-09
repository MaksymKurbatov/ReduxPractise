import {combineReducers, configureStore, createSelector} from '@reduxjs/toolkit'
import {useDispatch, useSelector} from "react-redux";
import {users, usersReducer, UserStoredAction} from "../moduls/users/users.slice.tsx";
import {counterReducer} from "../moduls/counters/counters.slice.tsx";

const reducer = combineReducers({
    users: usersReducer,
    counters: counterReducer
});
export const store = configureStore({
    reducer: reducer,
})

store.dispatch({
        type: "userStored",
        payload: {users},
    } satisfies UserStoredAction
)


export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppState>();
export const createAppSelector = createSelector.withTypes<AppState>();

