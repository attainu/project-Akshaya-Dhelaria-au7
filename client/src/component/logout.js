import React , {Component , Fragment} from 'react';
import Axios from 'axios';
import Backend_URL from '../deployed/backend.js'

function Logout(){

    const logoutApi = async() => {
        await Axios.get(`${Backend_URL}/api/v1/users/logout`)
        .then((data) => console.log("Logout" , data))
        .catch((err) => console.log("Logout" , err))
    }

    const logoutHandler = () =>{
        logoutApi()
        localStorage.removeItem('access-token')
    }

    return(
        <button onClick={logoutHandler}>Logout</button>
    )
}

export default Logout