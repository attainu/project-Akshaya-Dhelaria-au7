import React,{Component,Fragment} from 'react';
import Axios from 'axios';
import Backend_URL from '../../deployed/backend'
import Spinner from '../loader.gif'
import './profile.css'
import noresult from './noresults.png'

class Profile extends Component{
    state={
        data:[],
        initialized : false
    }

    callingProfile = async () => {
        const token = localStorage.getItem("access-token")
		const setHeader = {
			'Content-Type': 'application/json',
			'authorization': token
		}
        await Axios.get(`${Backend_URL}/profile/alltitles`,{
            headers:setHeader
        })
        // .then((data) => console.log("Data in profile ",data))
        .then((data) => this.setState({data:data.data, initialized :true}))
        .catch((err) => this.setState({initialized : true}))
    }

    componentDidMount(){
        // console.log("Profile page called")
        this.callingProfile()
    }

    updateHandler = (id) => {
        const {data} = this.state
        this.props.history.push(`/profile/updating/${id}`,{data:data})
    }

    deleteHandler = async (id,index) => {
        const token = localStorage.getItem("access-token")
		const setHeader = {
			'Content-Type': 'application/json',
			'authorization': token
		}
        await Axios.delete(`${Backend_URL}/profile/deletetitle/${id}`,{
            headers:setHeader
        })
        .then((data) => {
            var previousData = this.state.data;
            previousData.data.splice(index,1);
                                                                                                                                                                                                                                                                                                                                                                                                                                    this.setState({data: previousData})
        })
        .catch((err) => console.log("Error in profile is" , err))
        // this.callingProfile()
        setTimeout(() => {
            this.props.history.push(`/profile/mytutorials`)
        },5000)
    }

    render(){
        const {data,initialized} = this.state
        console.log("Data in profile is" , data)
        return(
            <Fragment>
                <p className="para">Profile</p>
                <hr/>
                {
                    (initialized == true && data.length == 0) ? <img className="no-result" src={noresult} alt="No Post Found"/> : data.length === 0 ? <img src={Spinner} alt='Loading...'/> :
                    data.data.map((eachCategory,index) => (
                        <div>
                            <br/>
                            <p>{eachCategory.Title}</p>
                            <a href={eachCategory.Link} target="_blank">{eachCategory.Link}</a>
                            <br/>
                            <br/>
                            <button className="btn btn-warning" onClick={() => this.updateHandler(eachCategory._id)}>
                                <i className="fa fa-edit" 
                                style={{
                                    'color':'white',
                                    'width':'50px',
                                    'position':'relative'
                                }}>
                                </i>
                            </button>
                            <button className="btn btn-danger" onClick={() => this.deleteHandler(eachCategory._id,index)}><i className="fa fa-trash" style={{
                                    'color':'white',
                                    'width':'50px',
                                    'position':'relative'
                                }}></i></button>
                        </div>
                    ))
                }
            </Fragment>
        )
    }
} 

export default Profile