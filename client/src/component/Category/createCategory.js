import React , {Component , Fragment} from 'react';
import Axios from 'axios';
import Backend_URL from '../../deployed/backend.js'
import { Link } from 'react-router-dom';
import CreateTitle from '../createLinks.js';

class CreateCategory extends Component{
	state={
		Category:''
	}

	callingCreateApi = async () => {
		const token = localStorage.getItem("access-token")
		const setHeader = {
			'Content-Type': 'application/json',
			'authorization': token
		}
		await Axios.post(`${Backend_URL}/category`,{
			Category:this.state.Category
		},{
			headers:setHeader
		})
		.then((data) => console.log("Created Category",data))
		.catch((err) => console.log("Error while creating category",err))
	}

	changeHandler = (event) => {
		const {name,value} = event.target
		this.setState({
			[name]:value
		})
	}

	submitHandler = (event) => {
		this.callingCreateApi()
		setTimeout(() => {
			this.props.history.push('/')
		},4000)
		event.preventDefault()
	}

	render(){
		const {Category} = this.state
		const accessToken = localStorage.getItem('access-token')
		return(
				<Fragment>
				{
					localStorage.getItem('access-token') ? <span></span> : 
					<div class="alert alert-danger" role="alert" style={{justifyContent:'center',width:'30vw',marginLeft:'450px'}}>
						Log in to create category
				  	</div>
				}
					<h3>Create the Category </h3>
					<br/>
					<i class="fa fa-th" aria-hidden="true"></i>
					<input name="Category" type="text" placeholder="Category" value={Category} onChange={this.changeHandler}/>
					<br />
					<br />
					<button className="btn btn-info" onClick={this.submitHandler} disabled={!accessToken}>Create Category</button>
				</Fragment>
		)
	}
}

export default CreateCategory;											