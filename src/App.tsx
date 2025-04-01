import {useEffect, useReducer, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {IncrementAction, store} from "./store/store.ts";

function App() {
    const [count, setCount] = useState(0);
    const [, forceUpdate] = useReducer((x)=> x+1, 0)

    useEffect(() => {
      const unsuscribe = store.subscribe(() => {
        forceUpdate();
      })
        return unsuscribe
    }, []);

    return (
        <>
            <h1>Vite + React</h1>
            <div className="card">
                <div>
                    counter {store.getState().counter}
                </div>
                <button onClick={() => store.dispatch({ type: 'increment' })}>
                    increment
                </button>
                <button onClick={() => store.dispatch({ type: 'decrement' })}>
                    decrement
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
