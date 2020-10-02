import React , {Component} from 'react';
import Axios from 'axios';
import Backend_URL from '../deployed/backend.js'
import Spinner from './loader.gif'

class Links extends Component{
	state={
        data:[],
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
    
	render(){
        const {data} = this.state
        // console.log("Props in link.js is" , this.props)
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