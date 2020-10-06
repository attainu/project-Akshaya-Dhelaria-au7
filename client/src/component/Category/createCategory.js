import React , {Component , Fragment} from 'react';
import Axios from 'axios';
import Backend_URL from '../../deployed/backend.js'
import {fetchCreateCategory} from '../../redux_store/action/create_category_action'
import {connect} from 'react-redux'
// import { Link } from 'react-router-dom';
// import CreateTitle from '../createLinks.js';

class CreateCategory extends Component{
	state={
		Category:'',
		data:'',
		exists: false,
		message:''
	}

	// callingCreateApi = async () => {
	// 	const token = localStorage.getItem("access-token")
	// 	const setHeader = {
	// 		'Content-Type': 'application/json',
	// 		'authorization': token
	// 	}
	// 	await Axios.post(`${Backend_URL}/category`,{
	// 		Category:this.state.Category
	// 	},{
	// 		headers:setHeader
	// 	})
	// 	.then((data) => this.setState({data:data.data.message}))
	// 	.catch((err) => console.log("Error while creating category",err.response.data.message))
	// }

	changeHandler = (event) => {
		const {name,value} = event.target
		this.setState({
			[name]:value
		})
	}

	submitHandler = (event) => {
		// this.callingCreateApi()
		this.props.fetchCreateCategory(this.state)
		const {message} = this.props.state.createCategory.data
		setTimeout(() => {
			const {data} = this.state
			const {message} = this.props.state.createCategory.data
			this.setState({
				message:message
			})
			if(message == "Category Already Exists!!"){
				this.props.history.push('/createcategory')
			}else{
				this.props.history.push('/')
			}
		},2000)
		event.preventDefault()
	}

	render(){
		const {Category,data,message} = this.state
		console.log("Render" , message)
		console.log("Create Category",this.props.state.createCategory.data)
		// const {message} = this.props.state.createCategory.data
		// const accessToken = localStorage.getItem('access-token')
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
					{
						message.length > 0 && <div className="alert alert-danger" role="alert" style={{justifyContent:'center','width':'40vw','marginLeft':'220px'}}>
                    		{message}
                		</div>
					}
					<i className="fa fa-th" aria-hidden="true"></i>
					<input name="Category" type="text" placeholder="Category" value={Category} onChange={this.changeHandler}/>
					<br />
					<br />
					<button className="btn btn-info" onClick={this.submitHandler}>Create Category</button>
				</Fragment>
		)
	}
}
const mapToProps = (state) => {
    console.log(state)
    return{
        state : state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCreateCategory: (categoryData) => dispatch(fetchCreateCategory(categoryData)) 
    }
}

export default connect(mapToProps,mapDispatchToProps)(CreateCategory);