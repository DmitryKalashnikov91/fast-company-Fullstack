import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark"; 


const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    onDelete,
    bookmark,
    onToggleBookMark,
}) => {
   // console.log(profession.name)
  return (<>
      <tr>
          <td>{name}</td>
          <td>{qualities.map(q=><Qualitie key={q._id} {...q}/>)}</td>
          <td>{profession.name}</td>
          <td>{completedMeetings}</td>
          <td>{rate}/5</td>
          <td><BookMark status={bookmark} onClick={()=>onToggleBookMark(_id)}/></td>
          <td><button className="btn btn-warning" onClick={()=>onDelete(_id)}>Удалить</button></td>
          
          </tr>
           </>)
//     <tbody>
//     {users.map((user) => (
//   <tr key={user._id}>
//     <td>{user.name}</td>
//     <td>
//       {user.qualities.map((item)=> (
//       <span className={'badge m-1 bg-' + item.color}  key={item._id}>{item.name}</span>
//     ))}
//     </td>
//     <td>{user.profession.name}</td>
//     <td>{user.completedMeetings}</td>
//     <td>{user.rate}/5</td>
//     {/* <td><button type="button" className="btn btn-danger" onClick={()=>handleDeleteUser(user._id)}>Удалить</button></td> */}
//   </tr>    
//     )  )           
//        } </tbody> 
};

export default User;