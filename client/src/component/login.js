import React , { Component , Fragment } from 'react';
import Axios from 'axios';
import Backend_URL from '../deployed/backend.js'

class Login extends Component{
    state={
        Email:'',
        Password:'',
        error:''
    }

    callingLoginApi = async () => {
        await Axios.post(`${Backend_URL}/users/login` , {
            Email:this.state.Email,
            Password:this.state.Password
        })
        .then((data) => {
            localStorage.setItem('access-token' , data.data.tokenKey)
        })
        .catch((err) => console.log("Error while retreiving data" , JSON.stringify(err.response)))
    }

    changeHandler = (event) => {
        const {name,value} = event.target
        this.setState({
            [name]:value
        })
    }

    submitHandler = (event) => {
        this.callingLoginApi()
        this.props.history.push('/')
        event.preventDefault()
    }

    render(){
        const {Email,Password} = this.state
        const enableButton = Email.includes('@') && Email.includes('.') && Password.length>6
        return(
            <form className="form-group" onSubmit={this.submitHandler}>
                <h3>Welcome Back</h3>
                <br />
                <i className="fa fa-envelope" /> 
                <input name="Email" type="email" placeholder="Email" value={Email} onChange={this.changeHandler}/>
                {
                    Email.length === 0 ? <span></span> : Email.length<6 || !Email.includes('@') || !Email.includes('.')  ? <p style={{color:'red'}}>Email should be valid</p> : <p style={{color:'green'}}>Perfect</p>
                }
                <br />
                <br />
                <i className="fa fa-key icon" />
                <input placeholder="Password" type="password" name="Password" value={Password} onChange={this.changeHandler}/>
                {
                    Password.length === 0 ? <span></span> : Password.length<6 && Password.length>0 ? <p style={{color:'red'}}>Should be more than 5 characters</p> : <p style={{color:'green'}}>Perfect</p>
                }
                <br />
                <br />
                <button className="btn btn-info" disabled={!enableButton}>Login</button>
            </form>
        )
    }
}

export default Login;