import React,{Component} from 'react';
import Axios from 'axios';
import Backend_URL from '../deployed/backend.js'
// console.log(Backend_URL)

class Verifyotp extends Component{
	state={
		OTP:''
	}

	callingOTPapi = async () => {
		console.log("Api called")
		const otpApi = await Axios.post(`${Backend_URL}/users/verifyotp` , {
            OTP: this.state.OTP
        })
        .then((data) => this.props.history.push('/login'))
        .catch((err) => console.log("Error while retreiving data" , JSON.stringify(err)))
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
		const {OTP} = this.state
		return(
			<div className = "otp">
				<h3>Thank you for signing up with us. </h3>
				<br />
				<p>Please verify your Email to continue with us.</p>
				<br />
				<i className="fa fa-key icon" />
				<input placeholder="Enter OTP" type="text" name="OTP" value={OTP} onChange={this.otpHandler}/>
	            <br />
	            <br />
	            <button className="btn btn-info" onClick={this.otpSubmitHandler}>Submit OTP</button>
            </div>
		)
	}
}

export default Verifyotp;