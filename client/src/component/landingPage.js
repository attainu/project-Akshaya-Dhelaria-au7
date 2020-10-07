import React , {Component,Fragment} from 'react';
import Axios from 'axios';
import Backend_URL from '../deployed/backend.js'
import Spinner from './loader.gif'
import {connect} from 'react-redux'
import {fetchData} from './../redux_store/action/category_action'

class Category extends Component{
	state={
        data:[],
        Category:'',
        searchData:'',
        error:''
	}

    callingSearchApi = async() => {
        await Axios.post(`${Backend_URL}/search`,{
            Category:this.state.Category
        })
        .then((data) => this.setState({searchData:data.data}))
        .catch((error) => this.setState({error:error.response.data.message}))
    }
    
    componentDidMount(){
        this.props.fetchData()
    }

    clickHandler = (category_id) => {
        this.props.history.push(`/title/titles/${category_id}`)
    }

    searchStateHandler = (event) => {
        const {name,value} = event.target
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
        const {Category,searchData,error} = this.state
        console.log(searchData)
        const {data} = this.props.state
        // console.log(error)
        const logo = <i className="fa fa-search" />
		return(
            <Fragment>
            <input type="search" placeholder="Search for the Programming Language: Python, Javascript" name="Category" value={Category} onChange={this.searchStateHandler} style={{'width':'50vw'}} />
            <input type="submit" className="btn btn-info" onClick={this.searchHandler} />
            <br/>
            {
                error.length > 0 ? <p style={{'color':'red'}}>{error}</p> : searchData.length === 0 ? <img src={Spinner} alt='Loading...'/> : searchData.data.map(eachCategory => (
                    <div className="row">
                        <div className="col-xs-7 col-sm-6 col-lg-8">
                            <h4 onClick={() => this.clickHandler(eachCategory._id)} className="category">{eachCategory.Category}</h4>
                        </div>
                    </div>
                ))
            }
            <br/>
            <br/>
            {
                data.length === 0 ? <img src={Spinner} alt='Loading...'/> :data.map(each => (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-8">
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


const mapToProps = (state) => {
    console.log("Landing page state ",state)
    return{
        state : state.categoryReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (categoryData) => dispatch(fetchData(categoryData)) 
    }
}

export default connect(mapToProps,mapDispatchToProps)(Category);