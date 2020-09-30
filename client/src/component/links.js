import React , {Component} from 'react';
import Axios from 'axios';
import Backend_URL from '../deployed/backend.js'
import Spinner from './loader.gif'

class Links extends Component{
	state={
        data:[],
        // Category:''
	}

	callingCreateApi = async () => {
		await Axios.post(`${Backend_URL}/${this.props.match.params.Category}`,{
            // Category:this.state.Category
        })
        // .then((data) => console.log("data in category is" , data.data.data))
        .then((data) => this.setState({data:data.data}))
		.catch((err) => console.log(err.response))
    }
    
    componentDidMount(){
        this.callingCreateApi()
    }
    
	render(){
        const {data} = this.state
        console.log("Data in link is" , data)
		return(
            data.length == 0 ? <img src={Spinner} alt='Loading...'/> : data.data.map(each => (
                <div>
                    <a className="link" href={each.Link} target="_blank">{each.Title}</a>
                </div>
            ))
		)
	}
}

export default Links;