import React , { Component } from 'react';
import Axios from 'axios';
import Backend_URL from '../deployed/backend.js'
import {Link, Route, Switch} from 'react-router-dom'
import Verifyotp from './verifyOtp.js';

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
        .catch((err) => 
            // console.log("Error while retreiving data" , JSON.stringify(err.response.data.message)),
            this.setState({error:err.response.data.message})
        )
    }

    changeHandler = (event) => {
        const {name,value} = event.target
        this.setState({
            [name]:value
        })
    }

    submitHandler = (event) => {
        this.callingLoginApi()
        setTimeout(() => {
            const {error} = this.state
            // console.log("error in login" , error)
            if(error.length>0){
                this.props.history.push('/login')
            }else{
                this.props.history.push('/')
            }
        },3000)
        event.preventDefault()
    }

    render(){
        const {Email,Password,error} = this.state
        const enableButton = Email.includes('@') && Email.includes('.') && Password.length>6 && error.length === 0
        return(
            <form className="form-group" onSubmit={this.submitHandler}>
            {
                error && <div class="alert alert-danger" role="alert" style={{justifyContent:'center'}}>
                    {error},<p>To verify <Link to='/verify'>click here </Link><Switch><Route path='/verify' exact component={Verifyotp}></Route></Switch></p>
                </div>
            }
                <h3>Welcome Back</h3>
                <br />
                <i className="fa fa-envelope" /> 
                <input name="Email" type="email" placeholder="Email" value={Email} onChange={this.changeHandler}/>
                {
                    Email.length === 0 ? <span></span> : Email.length<6 || !Email.includes('@') || !Email.includes('.')  ? <p className="para" style={{color:'red'}}>Email should be valid</p> : <p className="para" style={{color:'green'}}>Perfect</p>
                }
                <br />
                <i className="fa fa-key icon" />
                <input placeholder="Password" type="password" name="Password" value={Password} onChange={this.changeHandler}/>
                {
                    Password.length === 0 ? <span></span> : Password.length<6 && Password.length>0 ? <p className="para" style={{color:'red'}}>Should be more than 5 characters</p> : <p className="para" style={{color:'green'}}>Perfect</p>
                }
                <br />
                <br />
                <button className="btn btn-info" disabled={!enableButton}>Login</button>
            </form>
        )
    }
}

export default Login;