import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import {selectSelectedUser, selectSortedUsers, User, usersSlice} from "./users.slice.tsx";


export function UsersList() {
    const dispatch = useAppDispatch();
    const [sortType, setsSortType] = useState<"asc" | "desc">("asc")

    const sortedUsers = useAppSelector(selectSortedUsers(sortType))
    const selectedUser = useAppSelector(selectSelectedUser);
    const handleUserClick = (user: User) => {
        dispatch(usersSlice.actions.selected({userId: user.id}));
    };

    return (
        <div style={{padding: '20px'}}>
            <div>
                {selectedUser ? (
                    <div>
                        {`Select ${selectedUser.name}`}
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
                    sortedUsers.map((user, index) => (
                        <div user={user} style={{margin: '8px'}} onClick={() => handleUserClick(user)}>
                            {sortedUsers[index].name}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}