import {CounterId, selectCounter, store} from "../store/store.ts";
import {useEffect, useReducer, useRef} from "react";

export function Counter({counterId}: { counterId: CounterId }) {
    const [, forceUpdate] = useReducer((x) => x + 1, 0)
    const lastStateRef = useRef<ReturnType<typeof selectCounter> >(undefined);

    useEffect(() => {
        const unsuscribe = store.subscribe(() => {
            const currentState = selectCounter(store.getState(), counterId);
            const lastState = lastStateRef.current;
            if (currentState !== lastState) {
                forceUpdate();
            }
            lastStateRef.current = currentState;
        })
        return unsuscribe
    }, []);

    const counterState = selectCounter(store.getState(), counterId)

    return (
        <>
            <div>
                counter {counterState?.counter ?? 0}
            </div>
            <button onClick={() => store.dispatch({type: 'increment', payload: {counterId}})}>
                increment
            </button>
            <button onClick={() => store.dispatch({type: 'decrement', payload: {counterId}})}>
                decrement
            </button>
        </>
    )
}