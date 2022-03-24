import React, {useState} from "react";
import api from "../api";

const Users = () => {
  const [users, setUser] = useState(api.users.fetchAll());
  
    const handleDeleteUser = (id) => {
      setUser((prevState) => prevState.filter((user) => user._id !== id))
      console.log(id)
    }

    return <table className="table">
    <thead>
      <tr>
        <th scope="col">Имя</th>
        <th scope="col">Качества</th>
        <th scope="col">Профессия</th>
        <th scope="col">Встретился раз</th>
        <th scope="col">Оценка</th>
      </tr>
    </thead>
    <tbody>
    
      {users.map((user) => (
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>
            {user.qualities.map((item)=> (
            <span className={'badge m-1 bg-' + item.color}  key={item._id}>{item.name}</span>
          ))}
          </td>
          <td>{user.profession.name}</td>
          <td>{user.completedMeetings}</td>
          <td>{user.rate}/5</td>
          <td><button type="button" className="btn btn-warning" onClick={()=>handleDeleteUser(user._id)}>delete</button></td>
        </tr>
        )
      )
    }
    </tbody>
  </table>
}

export default Users;