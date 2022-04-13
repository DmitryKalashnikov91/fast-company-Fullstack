import React, { useState, useEffect } from "react";
import Users from "./components/users";
import API from "./api";

function App() {
    const [users, setUsers] = useState();
    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data));
    });
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) =>
                user._id === id ? { ...user, bookmark: !user.bookmark } : user
            )
        );
    };
    console.log(users);
    return (
        <div>{users &&
            <Users
                users={users}
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookMark}
            />}
        </div>
    );
}

export default App;
