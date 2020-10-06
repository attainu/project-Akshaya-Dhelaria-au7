
import React , { Component } from 'react';
import {Link ,Switch,Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchData} from '../redux_store/action/signup_action'

class Signup extends Component{
    state={
        Name:'',
        Email:'',
        Password:'',
        error:''
    }

    changeHandler = (event) => {
        const {name,value} = event.target
        this.setState({
            [name]:value
        })
    }

    submitHandler = (event) => {
        this.props.fetchData(this.state)
        setTimeout(() => {
            const {error} = this.props.state
            console.log("error in signup" , error)
            if(error.length>0){
                this.props.history.push('/signup')
            }else{
                this.props.history.push('/verify')
            }
        },5000)
        event.preventDefault()
    }

    render(){
        const {Name,Email,Password} = this.state
        const {error} = this.props.state
        const enableButton = Name.length>5 && Email.includes('@') && Email.includes('.') && Password.length>5 && error.length === 0
        return(
            <form className="form-group" onSubmit={this.submitHandler}>
                <h3>Welcome to Coding Hunt</h3>
                <p className="para">Signup to submit tutorials and more.</p>
                <hr />
                <i className="fa fa-user icon" />
                <input name="Name" type="text" placeholder="Full Name" value={Name} onChange={this.changeHandler} />
                {
                   Name.length === 0 ? <span></span> : Name.length<6 && Name.length>0 ? <p className="para" style={{color:'red'}}>Name should be more than 5 characters</p>: <p className="para" style={{color:'green'}}>Perfect</p>
                }
                
                <br />
                <i className="fa fa-envelope" /> 
                <input name="Email" type="email" placeholder="Email" value={Email} onChange={this.changeHandler}/>
                {
                    Email.length === 0 ? <span></span> : Email.length<6 || !Email.includes('@') || !Email.includes('.')  ? <p className="para" style={{color:'red'}}>Email should be valid</p> : error.length>0 ? <p className="para" style={{color:'red'}}>{error}</p> :<p style={{color:'green'}}>Perfect</p>
                }
               
                <br />
                <i className="fa fa-key icon" />
                <input placeholder="Password" type="password" name="Password" value={Password} onChange={this.changeHandler}/>
                {
                    Password.length === 0 ? <span></span> : Password.length<6 && Password.length>0 ? <p className="para" style={{color:'red'}}>Password should be more than 5 characters</p> : <p className="para" style={{color:'green'}}>Perfect</p>
                }
                <br />
                <br />
                <button className="btn btn-info" disabled={!enableButton}>Create Account</button>
                <br />
                <p className="para">Already have an account?<Link to='/login'>Login</Link><Switch><Route path='/login' exact /></Switch></p>
            </form>
        )
    }
}

const mapToProps = (state) => {
    return{
        state : state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (userData) => dispatch(fetchData(userData)) 
    }
}

export default connect(mapToProps , mapDispatchToProps)(Signup);