import React , {Component} from 'react';
import Axios from 'axios';
import Backend_URL from '../deployed/backend.js'
import Spinner from './loader.gif'

class Links extends Component{
	state={
        data:[],
        likes:''
	}

	callingCreateApi = async () => {
		await Axios.get(`${Backend_URL}/title/titles/${this.props.match.params.category_id}`,{
        })
        .then((data) => this.setState({data:data.data}))
		.catch((err) => console.log(err.response))
    }
    
    componentDidMount(){
        this.callingCreateApi()
    }
    
    clickHandler = (title_id,category_id) => {
        // this.props.history.push(`/likes/${title_id}`,{data:category_id})
        const token = localStorage.getItem("access-token")
		const setHeader = {
			'Content-Type': 'application/json',
			'authorization': token
		}
		Axios.post(`${Backend_URL}/likes/${title_id}`,{
            likes:this.state.likes
        },{
			headers:setHeader
        })
        .then((data) => 
            this.props.history.push(`/title/titles/${category_id}`)
        )
        // .then((data) => this.setState({likes:data}))
		.catch((err) => console.log(err.response))
    }

	render(){
        const {data} = this.state
        // console.log("Props in link.js is" , this.props)
        console.log("Data in state" , data)
		return(
            data.length == 0 ? <img src={Spinner} alt='Loading...'/> : data.map(each => (
                <div className="title-handler">
                    <a className="link" href={each.Link} target="_blank">{each.Title}</a>
                    <br/>
                    <button className="btn btn-primary" onClick={() => this.clickHandler(each._id,each.category_id)}>Likes: {each.Likes.length}</button>
                   
                </div>
            ))
		)
	}
}

export default Links;