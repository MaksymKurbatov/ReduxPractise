import {CounterId, store} from "../store/store.ts";
import {useEffect, useReducer} from "react";

export function Counter({counterId}: {counterId: CounterId}) {
    const [, forceUpdate] = useReducer((x)=> x+1, 0)

    useEffect(() => {
        const unsuscribe = store.subscribe(() => {
            forceUpdate();
        })
        return unsuscribe
    }, []);

    return (
        <>
            <div>
                counter {store.getState().counters[counterId]?.counter ?? 0 }
            </div>
            <button onClick={() => store.dispatch({type: 'increment', payload: {counterId} })}>
                increment
            </button>
            <button onClick={() => store.dispatch({type: 'decrement',  payload: {counterId}})}>
                decrement
            </button>
        </>
    )
}