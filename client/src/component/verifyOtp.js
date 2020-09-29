import React,{Component} from 'react';
import Axios from 'axios';
import Backend_URL from '../deployed/backend.js'
// console.log(Backend_URL)

class Verifyotp extends Component{
	state={
		OTP:'',
		error:''
	}

	callingOTPapi = async () => {
		const otpApi = await Axios.post(`${Backend_URL}/users/verifyotp` , {
            OTP: this.state.OTP
		})
		// .then((data) => console.log(data))
        .then((data) => this.props.history.push('/login'))
		// .catch((err) => console.log("Error while retreiving data" , (err.response)))
		.catch((err) => this.setState({error:err.response.data.message}))
	}

	otpHandler = (event) => {
		const {name,value} = event.target
		this.setState({
            [name]:value
        })
	}

	otpSubmitHandler = (event) => {
		this.callingOTPapi()
		console.log("Submitted OTP")
		event.preventDefault()
	}

	render(){
		const {OTP,error} = this.state
		console.log("Error is" , error)
		return(
			<div className = "otp">
				{
					error ? <div class="alert alert-danger" role="alert" style={{justifyContent:'center'}}>
					{error}
				  </div> : <span></span>
				}
				<h3>Thank you for signing up with us. </h3>
				<br />
				<p>Please verify your Email to continue with us.</p>
				<br />
				<i className="fa fa-key icon" />
				<input placeholder="Enter OTP" type="text" name="OTP" value={OTP} onChange={this.otpHandler}/>
	            <br />
				<br />
				{/*
					!error ? <button className="btn btn-info" onClick={this.otpSubmitHandler} >Submit OTP</button> : <p>{error}</p>  
				*/}
				<button className="btn btn-info" onClick={this.otpSubmitHandler}>Submit OTP</button>
            </div>
		)
	}
}

export default Verifyotp;