import React , {Component , Fragment} from 'react';
import Axios from 'axios';
import Backend_URL from '../deployed/backend.js'
import Spinner from './loader.gif'

class CreateTitle extends Component{
	state={
		Category:'',
        Title:'',
		Link:'',
		category_id:''
	}

	callingCreateApi = async () => {
		const {category_id} = this.state
		console.log("ID is" , category_id)
		const token = localStorage.getItem("access-token")
		const setHeader = {
			'Content-Type': 'application/json',
			'authorization': token
		}
		await Axios.post(`${Backend_URL}/title/createtitle/${category_id}`,{
            Title:this.state.Title,
            Link:this.state.Link
		},{
			headers:setHeader
		})
		.then((data) => console.log("Created Title",data))
		.catch((err) => console.log("Error while creating Title",err.response))
	}

	changeHandler = (event) => {
		const {name,value} = event.target
		this.setState({
			[name]:value
		})
	}

	componentDidMount(){
		Axios.get(`${Backend_URL}/allcategory`)
		.then((data) => this.setState({
            Category:data.data
        }))
		.catch((err) => console.log("Error is",err.response))
    }

	submitHandler = (event) => {
		this.callingCreateApi()
		setTimeout(() => {
			this.props.history.push('/')
		},4000)
		event.preventDefault()
		
	}

	storeCategory = (category_id) => {
		this.setState({
			category_id:category_id
		})
	}

	render(){
		const {Category,Title,Link} = this.state
		const accessToken = localStorage.getItem('access-token')
		return(
				<Fragment>
				{
					localStorage.getItem('access-token') ? <span></span> : 
					<div class="alert alert-danger" role="alert" style={{justifyContent:'center',width:'30vw',marginLeft:'450px'}}>
						Log in to create tutorial
				  	</div>
                }
                    <br/>
					<h3>Create the Tutorial </h3>
					<br/>
					<label>Choose the category</label>
					<select>
					{
						Category.length == 0 ? <img src={Spinner} alt='Loading...'/> :
						Category.data.map(eachCategory => (
							<Fragment>
								<option value={eachCategory._id} onClick={() => this.storeCategory(eachCategory._id)}>{eachCategory.Category}</option>
							</Fragment>
						))
					}
					</select>
					<br/>
					<br/>
					<i className="fa fa-list" aria-hidden="true"></i>
					<input name="Title" type="text" placeholder="Title" value={Title} onChange={this.changeHandler}/>
					<br />
					<br />
					<i className="fa fa-link" aria-hidden="true"></i>
					<input name="Link" type="text" placeholder="Link" value={Link} onChange={this.changeHandler}/>
					<br />
					<br />
					<button className="btn btn-info" onClick={this.submitHandler} disabled={!accessToken}>Create Tutorial</button>
				</Fragment>
		)
	}
}

export default CreateTitle;
