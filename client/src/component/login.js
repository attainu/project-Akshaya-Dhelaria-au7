import React , { Component , Fragment } from 'react';

class Signup extends Component{
    state={
        Name:'',
        Email:'',
        Password:''
    }

    changeHandler = (event) => {
        const {name,value} = event.target
        this.setState({
            [name]:value
        })
    }

    submitHandler = (event) => {
        event.preventdefault()
        console.log("Done Login")
    }

    render(){
        const {Name,Email,Password} = this.state
        const enableButton = Name.length>6 && Email.includes('@') && Email.includes('.') && Password.length>6
        return(
            <form className="form-group" onSubmit={this.submitHandler}>
                <h3>Welcome Back</h3>
                <i class="fa fa-envelope" /> 
                <input name="Email" type="email" placeholder="Email" value={Email} onChange={this.changeHandler}/>
                {
                    Email.length === 0 ? <span></span> : Email.length<6 || !Email.includes('@') || !Email.includes('.')  ? <p style={{color:'red'}}>Email should be valid</p> : <p style={{color:'green'}}>Perfect</p>
                }
                <br />
                <br />
                <i class="fa fa-key icon" />
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

export default Signup;