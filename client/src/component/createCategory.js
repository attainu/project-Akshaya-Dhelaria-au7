import React , {Component , Fragment} from 'react';
import Axios from 'axios';
import Backend_URL from '../deployed/backend.js'
import { Link } from 'react-router-dom';

class CreateCategory extends Component{
	state={
		Category:'',
		Title:'',
		Link:''
	}

	callingCreateApi = async () => {
		const token = localStorage.getItem("access-token")
		const setHeader = {
			'Content-Type': 'application/json',
			'authorization': token
		}
		await Axios.post(`${Backend_URL}/category`,{
			Category:this.state.Category,
			Title:this.state.Title,
			Link:this.state.Link
		},{
			headers:setHeader
		})
		.then((data) => console.log(data))
		.catch((err) => console.log(err))
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
		// console.log("Create Category")
		event.preventDefault()
		
	}

	render(){
		const {Category,Title,Link} = this.state
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
					<p></p>
					<i class="fa fa-th" aria-hidden="true"></i>
					<input name="Category" type="text" placeholder="Category" value={Category} onChange={this.changeHandler}/>
					<br/>
					<br/>
					<i class="fa fa-list" aria-hidden="true"></i>
					<input name="Title" type="text" placeholder="Title" value={Title} onChange={this.changeHandler}/>
					<br />
					<br />
					<i className="fa fa-link" aria-hidden="true"></i>
					<input name="Link" type="text" placeholder="Link" value={Link} onChange={this.changeHandler}/>
					<br />
					<br />
					<button className="btn btn-info" onClick={this.submitHandler} disabled={!accessToken}>Create Category</button>
				</Fragment>
		)
	}
}

export default CreateCategory;
