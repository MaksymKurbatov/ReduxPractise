import './App.css'
import {Counter} from "./components/counter/counter.tsx";
import {UsersList} from "./users-list.tsx";

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
