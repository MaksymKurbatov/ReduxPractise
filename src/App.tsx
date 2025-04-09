import './App.css'
import {Counter} from "./moduls/counters/counter.tsx";
import {UsersList} from "./moduls/users/users-list.tsx";

function App() {
    return (
        <>
            <div className="card">
                <Counter counterId='first'/>
                <Counter counterId='second'/>
                <UsersList/>
            </div>
        </>
    )
}

export default App
