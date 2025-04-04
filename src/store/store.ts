import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {useDispatch, useSelector, useStore} from "react-redux";

export type UserId = string;

export type User = {
    id: string,
    name: string,
    desription: string
}
const users: User[] = Array.from({length: 3000}, (_, index) => ({
    id: `user${index + 1}`,
    name: `User ${index + 1}`,
    desription: `Description for User ${index + 11}`
}))

type UsersState = {
    entities: Record<UserId, User | undefined>;
    ids: UserId[];
    selectedUserId: UserId | undefined
}

type CounterState = {
    counter: number;
}
type CountersState = Record<CounterId, CounterState | undefined>;
export type CounterId = string;

export type UserSelectedAction = {
    type: 'userSelected';
    payload: {
        userID: UserId
    };
}

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
export type IncrementAction = {
    type: 'increment';
    payload: {
        counterId: CounterId;
    }
}
export type DecrementAction = {
    type: 'decrement';
    payload: {
        counterId: CounterId;
    }
}
type Action = IncrementAction | DecrementAction | UserSelectedAction | UserUnSelectedAction | UserStoredAction;

const initialUsersState: UsersState = {
    entities: {},
    ids: [],
    selectedUserId: undefined
}
const initialCounterState: CounterState = {counter: 0}
const initialCountersState: CountersState = {};

const usersReducer = (state = initialUsersState, action: Action): UsersState => {
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
const counterReducer = (state = initialCountersState, action: Action): CountersState => {
    switch (action.type) {
        case "increment": {
            const {counterId} = action.payload
            const currentCounter = state[counterId] ?? initialCounterState
            return {
                ...state,
                [counterId]: {
                    ...currentCounter,
                    counter: currentCounter.counter + 1,
                }
            }
        }
        case "decrement": {
            const {counterId} = action.payload
            const currentCounter = state[counterId] ?? initialCounterState
            return {
                ...state,
                [counterId]: {
                    ...currentCounter,
                    counter: currentCounter.counter - 1,
                }
            }
        }
        default:
            return state;
    }
};
/*const reducer = (state = initialState, action: Action): State => {
    return {
        users: usersReducer(state.users, action),
        counters: counterReducer(state.counters, action),
    }
}*/

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


export function selectCounter(state: AppState, counterId: CounterId) {
    return state.counters[counterId];
}

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
