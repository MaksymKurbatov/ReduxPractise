import {useEffect, useReducer, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {IncrementAction, store} from "./store/store.ts";
import {Counter} from "./components/Counter.tsx";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <h1>Vite + React</h1>
            <div className="card">
                <Counter counterId='first'/>
                <Counter counterId='second'/>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
