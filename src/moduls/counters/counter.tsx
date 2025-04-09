
import {useDispatch} from "react-redux";
import './counter.css'
import {CounterId, selectCounter} from "./counters.slice.tsx";
import {useAppSelector} from "../../store/store.ts";

export function Counter({counterId}: { counterId: CounterId }) {
    const dispatch = useDispatch();
    const counterState = useAppSelector((state) => selectCounter(state, counterId))

    return (
        <div className="counter">
            <div>
                counter {counterState?.counter ?? 0}
            </div>
            <button onClick={() => dispatch({type: 'increment', payload: {counterId}})}>
                increment
            </button>
            <button onClick={() => dispatch({type: 'decrement', payload: {counterId}})}>
                decrement
            </button>
        </div>
    )
}