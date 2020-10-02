import React , {Component , Fragment} from 'react';
import {Route,Switch,Link , Redirect} from 'react-router-dom'
import Signup from '../signup';
import Login from '../login';
import CreateCategory from '../Category/createCategory.js'
import './navbar.css'
import Verifyotp from '../verifyOtp';
import Category from '../landingPage';
import Links from '../links';
import Profile from '../Profile/userProfile';
import Logout from '../logout';
import UpdateProfile from '../Profile/updateUserProfile'
import CreateTitle from '../createLinks';

function Navbar(){
    const logoutHandler = () =>{
        localStorage.removeItem('access-token')
    }
        return(
            <Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to='/'>
                            <img className="logo" src='./ch.jpg' alt="Logo" />
                            </Link>
                        </li>
                        {
                            !localStorage.getItem('access-token') ?
                            <Fragment>
                                <li className="nav-item active">
                                    <Link to='/signup'>
                                    <button className="button-nav">Signup</button>
                                    </Link>
                                </li>
                                <li className="nav-item active">
                                    <Link to='/login'>
                                    <button className="button-nav">Login</button>
                                    </Link>
                                </li>
                            </Fragment> :
                            <Fragment>
                                <li className="nav-item active">
                                    <i className="fa fa-plus"></i>
                                    <Link to='/createcategory'>
                                    <button className="button-nav">Create Category</button>
                                    </Link>
                                </li>
                                <li className="nav-item active">
                                    <i className="fa fa-plus"></i>
                                    <Link to='/title/createtitle'>
                                    <button className="button-nav">Create Tutorial</button>
                                    </Link>
                                </li>
                                <li className="nav-item active">
                                    <Link to='/'>
                                    </Link>
                                </li>
                                <li className="nav-item active">
                                    <Link to='/profile/mytutorials'>
                                    <button className="button-nav">Profile</button>
                                    </Link>
                                </li>
                                <li className="nav-item active">
                                    <Link to='/login'>
                                    <button onClick={logoutHandler} className="button-nav">Logout</button>
                                    </Link>
                                </li>
                            </Fragment>
                        }
                    </ul>
                </nav>
                    <Switch>
                        <Route path='/signup' exact component={Signup}/>
                        <Route path='/verify' component={Verifyotp} />
                        <Route path='/login' exact component={Login}/>
                        <Route path='/createcategory' exact component={CreateCategory}/>
                        <Route path='/title/titles/:category_id' exact component={Links} />
                        <Route path='/' exact component={Category}/>
                        <Route path='/profile/mytutorials' exact component={Profile} />
                        <Route path='/profile/updating/:_id' exact component={UpdateProfile}/>
                        <Route path='/title/createtitle' exact component={CreateTitle} />
                        <Route path='/login' exact component={Logout} />
                    </Switch>
            </Fragment>
        )
}

export default Navbar;