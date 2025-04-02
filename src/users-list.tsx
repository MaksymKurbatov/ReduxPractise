import {useState} from "react";
import { useAppDispatch, useAppSelector, User} from "./store/store.ts";



export function UsersList() {
    console.log("render")
    const dispatch = useAppDispatch();
    const [sortType, setsSortType] = useState<"asc" | "desc">("asc")
    const ids = useAppSelector((state) => state.users.ids);
    const enteties = useAppSelector((state) => state.users.entities);
    const selectedUserId = useAppSelector((state) => state.users.selectedUserId)

    const selectedUser = selectedUserId ? enteties[selectedUserId] : undefined;

    console.log(ids)

    const sortedUsers = ids
        .map((id) => enteties[id])
        .sort((a, b) => {
            if (sortType === "asc") {
                return a.name.localeCompare(b.name)
            } else {
                return b.name.localeCompare(a.name);
            }
        });
    const handleUserClick = (user: User) => {
        dispatch({
            type: "userSelected",
            payload: {userId: user.id}

        })
    };

    return (
        <div style={{padding: '20px'}}>
            <div>
                {selectedUser ? (
                    <div>
                        {"Selected "} {selectedUser.id}
                    </div>
                ) : (
                    "No user selected"
                )}
            </div>
            <button onClick={() => setsSortType("asc")}>
                Asc
            </button>
            <button style={{marginLeft: '20px'}} onClick={() => setsSortType("desc")}>
                Desc
            </button>
            <div>
                {
                    sortedUsers.map((user,index) => (
                        <div user={user} style={{margin: '8px'}} onClick={() => handleUserClick(user)}>
                            {sortedUsers[index].name}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}