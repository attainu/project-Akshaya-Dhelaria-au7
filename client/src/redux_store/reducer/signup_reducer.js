import {signup} from '../action/signup_action'
import store from '../store/store'

const initialState = {
    // Name:'',
    // Email:'',
    // Password:'',
    // error:''
    user:{},
    error:''
}

const signupReducer = (state = initialState , action) => {
    const {type,payload} = action
    if(type == "USER_SIGNUP"){
        // console.log("Payload" , payload)
        return { 
            ...state,
            user: {...payload}
        }
    }
    if(type == "USER_SIGNUP_ERROR"){
        return {
            ...state,
            error: payload
        }
    }
    return state
}

export default signupReducer