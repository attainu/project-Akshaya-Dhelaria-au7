import React , {Component , Fragment} from 'react';
import {Route,Switch,Link} from 'react-router-dom'
import Signup from '../signup';
import Login from '../login';
import './navbar.css'

class Navbar extends Component{
    render(){
        return(
            <Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to='/'>Signup</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to='/login'>Login</Link>
                        </li>
                    </ul>
                </nav>
                    <Switch>
                        <Route path='/' exact component={Signup}/>
                        <Route path='/login' exact component={Login}/>
                    </Switch>
            </Fragment>
        )
    }
}

export default Navbar;