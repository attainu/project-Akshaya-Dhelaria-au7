import React,{Component,Fragment} from 'react';
import Axios from 'axios';
import Backend_URL from '../../deployed/backend'

class Profile extends Component{
    state={
        data:[]
    }

    callingProfile = async () => {
        await Axios.get(`${Backend_URL}/profile/allcategories`)
        .then((data) => console.log("Data in profile ",data))
        .catch((err) => console.log("Error in profile is" , err))
    }

    componentDidMount(){
        this.callingProfile()
    }

    render(){
        return(
            <Fragment>
                <p>Profile Page</p>
            </Fragment>
        )
    }
} 

export default Profile