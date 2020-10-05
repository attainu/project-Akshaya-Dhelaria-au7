import Axios from 'axios';
import Backend_URL from '../../deployed/backend'

export const signup = eachUser => {
    return{
        type:"USER_SIGNUP",
        payload: eachUser
    }
}

export const fetchDataError = error => {
    return {
        type:"USER_SIGNUP_ERROR",
        payload: error
    }
}

export const fetchData = (userInfo) => {
    return async function(dispatch){
        // console.log("Dispatch",dispatch , "Info" , userInfo)
        await Axios.post(`${Backend_URL}/users/signup` , userInfo )
        .then(response => {
            // console.log("Action ",response.response)
            dispatch(signup(response.response))
        })
        .catch(error => {
            // console.log("Action error",error)
            dispatch(fetchDataError(error.response.data.error))
        })
    }
}

