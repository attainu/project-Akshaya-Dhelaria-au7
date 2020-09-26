import React , {Component , Fragment} from 'react';
import Axios from 'axios';
import Backend_URL from '../deployed/backend.js'

class CreateCategory extends Component{
	state={
		Category:'',
		Title:''
	}

	callingCreateApi = async () => {
		await Axios.post(`${Backend_URL}/category`,{
			Category:this.state.Category,
			Title:this.state.Title
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
		// console.log("Create Category")
		event.preventDefault()
	}

	render(){
		const {Category,Title} = this.state
		return(
			<Fragment>
				<h3>Create the Category </h3>
				<p></p>
				<i className='fas fa-code'></i>
				<input name="Category" type="text" placeholder="Category" value={Category} onChange={this.changeHandler}/>
				<br/>
				<br/>
				<i className="fa fa-link"></i>
				<input name="Title" type="text" placeholder="Title" value={Title} onChange={this.changeHandler}/>
				<br />
				<br />
				<button className="btn btn-info" onClick={this.submitHandler}>Create Category</button>
			</Fragment>
		)
	}
}

export default CreateCategory;