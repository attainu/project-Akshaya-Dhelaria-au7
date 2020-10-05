import {createStore, applyMiddleware} from 'redux'
import signupReducer from '../reducer/signup_reducer'
// import {fetchData} from '../action/signup_action'
import thunk from 'redux-thunk'


const store = createStore(signupReducer,applyMiddleware(thunk))
// console.log("initial state ",store.getState())

// dispatch(fetchData())

export default store;