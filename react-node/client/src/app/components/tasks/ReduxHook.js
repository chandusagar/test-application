import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { user } from '../../redux/actions/userAction';


const ReduxHook = () => {
    let users = useSelector((store) => store.users);
   
    // console.log(users);
    let dispatch=useDispatch()
    const counter = () => {
        dispatch(user.userList());
      
    }

    const [userObj, setUsersObj] = React.useState({firstName:"",lastName:""});
    const onchnage = (e) => {
        const { name, value } = e.target;
        setUsersObj({ ...userObj, [name]: value });
        
    }

    const submit = (e) => {
        e.preventDefault();
        dispatch(user.userList(userObj));
          console.log("test page", users);
    }

    return (
        <div>
            <h3>react hook counter function</h3>
            <form>
                <span>First Name</span>
                <input type="text" name="firstName" onChange={onchnage} placeholder="first Name" />
                 <span>Last Name</span>
                <input type="text" name="lastName" onChange={onchnage} placeholder="last Name" />
                <button type="button" onClick={submit} >submit</button>
                </form>
            <button onClick={counter}>increment</button>
         </div>
    )
}

export default ReduxHook;

 // 8374083372

