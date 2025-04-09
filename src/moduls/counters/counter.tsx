import {useDispatch} from "react-redux";
import './counter.css'
import {CounterId, decrementAction, incrementAction, selectCounter} from "./counters.slice.tsx";
import {useAppSelector} from "../../store/store.ts";

export function Counter({counterId}: { counterId: CounterId }) {
    const dispatch = useDispatch();
    const counterState = useAppSelector((state) => selectCounter(state, counterId))

    return (
        <div className="counter">
            <div>
                counter {counterState?.counter ?? 0}
            </div>
            <button onClick={() => dispatch(incrementAction({counterId}))}>
                increment
            </button>
            <button onClick={() => dispatch(decrementAction({counterId}))}>
                decrement
            </button>
        </div>
    )
}