import React , {Component,Fragment} from 'react';
import Axios from 'axios';
import Backend_URL from '../deployed/backend.js'
import Spinner from './loader.gif'

class Likes extends Component{
	state={
        likes:'',
	}

	callingCreateApi = async () => {
        const token = localStorage.getItem("access-token")
        console.log("token is ",token)
		const setHeader = {
			'Content-Type': 'application/json',
			'authorization': token
		}
		await Axios.post(`${Backend_URL}/likes/${this.props.match.params.title_id}`,{
            likes:this.state.likes
        },{
			headers:setHeader
        })
        .then((data) => console.log("Data is",data))
        // .then((data) => this.setState({likes:data}))
		.catch((err) => console.log(err.response))
    }
    
    componentDidMount(){
        this.callingCreateApi()
    }

    submitHandler = (event) => {
        this.props.history.push(`/title/titles/${this.props.location.state.data}`)
        event.preventDefault()
    }

	render(){
        // const {data} = this.state
        // console.log("Props in link.js is" , this.props)
        // console.log("Data in state" , data)
		return(
            // data.length == 0 ? <img src={Spinner} alt='Loading...'/> : data.data.map(each => (
            //    <div>
            //    {/*
            //         console.log("Each" , each)
            //     */}
            <Fragment>
                <p>Successfully Liked the Post!!!</p>
                <button onClick={this.submitHandler}>Go back</button>
            </Fragment>
            )
	}
}

export default Likes;