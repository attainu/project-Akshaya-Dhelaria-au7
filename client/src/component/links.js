import React , {Component, Fragment} from 'react';
import Axios from 'axios';
import Backend_URL from '../deployed/backend.js'
import Spinner from './loader.gif'

class Links extends Component{
	state={
        data:[],
        message:'',
        error:''
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
    
    clickHandler = (title_id,category_id,index) => {
        const token = localStorage.getItem("access-token")
		const setHeader = {
			'Content-Type': 'application/json',
			'authorization': token
		}
		Axios.post(`${Backend_URL}/likes/${title_id}`,{
            // likes:this.state.likes
        },{
			headers:setHeader
        })
        .then((data) => {
            console.log(data.data.message)
            var previousData = this.state.data;
            var likedPost =  previousData[index];
            likedPost.Likes.push(data.data.data.Like);
            previousData[index] = likedPost;
            this.setState({data: previousData,message:data.data.message})  
        })
		.catch((err) => this.setState({error:err.response}))
    }

	render(){
        const {data,error,message} = this.state
        console.log(message)
		return(
            <Fragment>
            {data.length === 0 ? <img src={Spinner} alt='Loading...'/> : data.map((each,index) => (
                <div className="title-handler">
                    <a className="link" href={each.Link} target="_blank">{each.Title}</a>
                    <br/>
                    <button className="btn btn-primary" onClick={() => this.clickHandler(each._id,each.category_id,index)}>Likes: {each.Likes.length}</button>
                    <br />
                    {
                        message.length > 0 && <div class="alert alert-info" role="alert" style={{justifyContent:'center'}}>{message}</div> 
                    } 
                    {/*
                        !localStorage.getItem('access-token') && <p>Please login to like the post</p>
                    */}
                </div>
            ))}
            </Fragment>
		)
	}
}

export default Links;