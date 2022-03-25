import React, {useState} from "react";
import api from "../api";

const Users = () => {
  const [users, setUser] = useState(api.users.fetchAll());
  const Header = () => {
    let str = 'никто не придет'
    let str1 = 'человек тусанет с тобой сегодня';
    let str2 = 'человека тусанут с тобой сегодня';
const renderFraze = (n) => {
   let renderNStr = String(n);
    if (+renderNStr === 1 || +renderNStr > 4 && +renderNStr < 22) {
       return str1;
     } else if (+renderNStr === 0){
       return str;
    } else {
      return str2;
    } 
  };
   let n = users.length; 
   console.log(users)
   let string = `${renderFraze(n)}`;
   let classes = "badge m-2 ";
      classes += n === 0 ? "bg-warning" : "bg-primary"
   let zeroSpan = <span className={classes}>{string}</span>;
      if (n === 0) { 
        return( 
            <>
              {zeroSpan}
            </>
            )
        } else return <>{String(n)} {zeroSpan}</>
};
    const handleDeleteUser = (id) => {
      setUser((prevState) => prevState.filter((user) => user._id !== id))
      
    }

    return <>
    {Header()} 
    {users.length > 0 &&
    <table className="table">
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
          <td><button type="button" className="btn btn-danger" onClick={()=>handleDeleteUser(user._id)}>Удалить</button></td>
        </tr>
        )
      )
    }
    </tbody>
  </table> 
  }
    </> 
}

export default Users;