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
		.catch((err) => console.log(err.response))
    }
    
    componentDidMount(){
        this.callingCreateApi()
    }

    clickHandler = (category_id) => {
        const {data} = this.state
        this.props.history.push(`/title/titles/${category_id}`)
    }

	render(){
        const {data} = this.state
		return(
            data.length == 0 ? <img src={Spinner} alt='Loading...'/> : data.data.map(each => (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xs-7 col-sm-6 col-lg-8">
                            <h4 onClick={() => this.clickHandler(each._id)} className="category">{each.Category}</h4>
                        </div>
                    </div>
                </div>
            ))
		)
	}
}

export default Category;