import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppState} from "../../store/store.ts";

export type UserId = string;

export type User = {
    id: string,
    name: string,
    desription: string
}
export const users: User[] = Array.from({length: 3000}, (_, index) => ({
    id: `user${index + 1}`,
    name: `User ${index + 1}`,
    desription: `Description for User ${index + 11}`
}))
type UsersState = {
    entities: Record<UserId, User | undefined>;
    ids: UserId[];
    selectedUserId: UserId | undefined
}
export type UserStoredAction = {
    type: 'userStored';
    payload: {
        users: User[]
    };
}
const initialUsersState: UsersState = {
    entities: {},
    ids: [],
    selectedUserId: undefined
}
export const selectUserEntities = (state: AppState) => state.users.entities;
export const selectUserIds = (state: AppState) => state.users.ids;
export const selectedUserId = (state: AppState) => state.users.selectedUserId;
export const selectSelectedUser = createSelector(
    [selectUserEntities, selectedUserId],
    (entities, selectedId) => selectedId ? entities[selectedId] : undefined
);
export const selectSortedUsers = (sort: "asc" | "desc") => createSelector(
    [selectUserIds, selectUserEntities],
    (ids, entities) =>
        [...ids]
            .map(id => entities[id]!)
            .sort((a, b) => {
                return sort === "asc"
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            })
);

export const usersSlice = createSlice({
    name: "users",
    initialState: initialUsersState,
    selectors: {
        selectedUserId: (state) => state.selectedUserId,
    },
    reducers: {
        selected: (state, action: PayloadAction<{ userId: string }>) => {
            state.selectedUserId = action.payload.userId;
        },
        selectedRemove: (state) => {
            state.selectedUserId = undefined;
        },
        stored: (state, action: PayloadAction<{ userId: User[] }>) => {
            const {users} = action.payload

            state.entities = users.reduce((acc, user) => {
                acc[user.id] = user;
                return acc;
            }, {} as Record<UserId, User>);
            state.ids = users.map((user) => user.id)
        }
    }
})


