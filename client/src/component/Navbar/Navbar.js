import React , {Component , Fragment} from 'react';
import {Route,Switch,Link} from 'react-router-dom'
import Signup from '../signup';
import Login from '../login';
import CreateCategory from '../createCategory.js'
import './navbar.css'
import Verifyotp from '../verifyOtp';
import Category from '../landingPage';
import Links from '../links';

class Navbar extends Component{
    render(){
        return(
            <Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to='/signup'>
                            <button>Signup</button>
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link to='/login'>
                            <button>Login</button>
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <i className="fa fa-plus"></i>
                            <Link to='/create'>
                            <button>Create Category</button>
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link to='/'>
                            </Link>
                        </li>
                    </ul>
                </nav>
                    <Switch>
                        <Route path='/signup' exact component={Signup}/>
                        <Route path='/verify' component={Verifyotp} />
                        <Route path='/login' exact component={Login}/>
                        <Route path='/create' exact component={CreateCategory}/>
                        <Route path='/links' exact component={Links} />
                        <Route path='/' exact component={Category}/>
                    </Switch>
            </Fragment>
        )
    }
}

export default Navbar;