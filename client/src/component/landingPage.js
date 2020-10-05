import React , {Component,Fragment} from 'react';
import Axios from 'axios';
import Backend_URL from '../deployed/backend.js'
import Spinner from './loader.gif'

class Category extends Component{
	state={
        data:[],
        Category:'',
        searchData:'',
        error:''
	}

	callingCreateApi = async () => {
        // const {data} = this.state
		await Axios.get(`${Backend_URL}/allcategory`)
		.then((data) => this.setState({
            data:data.data
        }))
		.catch((err) => console.log(err.response))
    }

    callingSearchApi = async() => {
        await Axios.post(`${Backend_URL}/search`,{
            Category:this.state.Category
        })
        .then((data) => this.setState({searchData:data.data}))
        .catch((error) => this.setState({error:error.response.data.message}))
    }
    
    componentDidMount(){
        this.callingCreateApi()
        // this.forceUpdate()
    }

    clickHandler = (category_id) => {
        // const {data} = this.state
        this.props.history.push(`/title/titles/${category_id}`)
    }

    searchStateHandler = (event) => {
        const {name,value} = event.target
        // console.log()
        this.setState({
            [name] : value
        })
    }

    searchHandler = () => {
        this.callingSearchApi()
    }

	render(){
        // this.forceUpdate()
        console.log("Props in landing page" , this.props)
        const {data,Category,searchData,error} = this.state
        console.log(error)
        const logo = <i className="fa fa-search" />
		return(
            <Fragment>
            <input type="search" placeholder="Search for the Programming Language: Python, Javascript" name="Category" value={Category} onChange={this.searchStateHandler} style={{'width':'50vw'}} />
            <input type="submit" onClick={this.searchHandler} />
            <br/>
            {
                error.length > 0 && <p style={{'color':'red'}}>{error}</p>
            }
            <br/>
            <br/>
            {
                data.length === 0 ? <img src={Spinner} alt='Loading...'/> : data.data.map(each => (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xs-7 col-sm-6 col-lg-8">
                                <h4 onClick={() => this.clickHandler(each._id)} className="category">{each.Category}</h4>
                            </div>
                        </div>
                    </div>
                ))
            }
            </Fragment>
            )
	}
}

export default Category;