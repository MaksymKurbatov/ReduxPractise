import {createSelector} from '@reduxjs/toolkit'
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

export type UserSelectedAction = {
    type: 'userSelected';
    payload: {
        userId: UserId;
    };
};

export type UserUnSelectedAction = {
    type: 'userUnSelected';
    payload: {
        userID: UserId
    };
}
export type UserStoredAction = {
    type: 'userStored';
    payload: {
        users: User[]
    };
}
type Action = UserSelectedAction | UserUnSelectedAction | UserStoredAction;

const initialUsersState: UsersState = {
    entities: {},
    ids: [],
    selectedUserId: undefined
}
export const usersReducer = (state = initialUsersState, action: Action): UsersState => {
    switch (action.type) {
        case "userStored": {
            const {users} = action.payload
            return {
                ...state,
                entities: users.reduce((acc, user) => {
                    acc[user.id] = user;
                    return acc;
                }, {} as Record<UserId, User>),
                ids: users.map((user) => user.id)
            }
        }
        case "userSelected": {
            const {userId} = action.payload
            return {
                ...state,
                selectedUserId: userId
            }
        }
        case "userUnSelected": {
            return {
                ...state,
                selectedUserId: undefined
            }
        }
        default:
            return state;
    }
};
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


