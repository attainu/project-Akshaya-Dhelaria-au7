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
        console.log("Done signing")
    }

    render(){
        const {Name,Email,Password} = this.state
        const enableButton = Name.length>6 && Email.includes('@') && Email.includes('.') && Password.length>6
        return(
            <form className="form-group" onSubmit={this.submitHandler}>
                <h3>Welcome to Coding Hunt</h3>
                <p>Signup to submit tutorials and more.</p>
                <hr/>
                <i class="fa fa-user icon" />
                <input name="Name" type="text" placeholder="Full Name" value={Name} onChange={this.changeHandler} />
                {
                   Name.length === 0 ? <span></span> : Name.length<6 && Name.length>0 ? <p style={{color:'red'}}>Should be more than 5 characters</p>: <p style={{color:'green'}}>Perfect</p>
                }
                <br />
                <br />
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
                {/*
                    Name.length>6 && Email.includes('@') && Email.includes('.') && Password.length>6 ? <button className="btn btn-info" enabled>Create Account</button> : <button className="btn btn-info" disabled>Create Account</button>
                */}
                <button className="btn btn-info" disabled={!enableButton}>Create Account</button>
                <br />
                <p>Already have account?<a href="/login"> Login</a></p>
            </form>
        )
    }
}

export default Signup;