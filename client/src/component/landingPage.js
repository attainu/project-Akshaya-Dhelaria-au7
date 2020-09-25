import React , {Component} from 'react';
import Axios from 'axios';
import Backend_URL from '../deployed/backend.js'
import Spinner from './loader.gif'

class Category extends Component{
	state={
		data:[]
	}

	callingCreateApi = async () => {
        const {data} = this.state
		await Axios.get(`${Backend_URL}/allcategory`)
		.then((data) => this.setState({
            data:data.data
        }))
		.catch((err) => console.log(err))
    }
    
    componentDidMount(){
        this.callingCreateApi()
    }

	render(){
        const {data} = this.state
        // console.log("data" , data)
		return(
            data.length == 0 ? <img src={Spinner} alt='Loading'/> : data.data.map(each => (
                <div>
                    <p className="category">{each.Category}</p>
                </div>
            ))
            // <h2>ok</h2>
		)
	}
}

export default Category;