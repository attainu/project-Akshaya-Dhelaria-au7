import React from 'react';
import {Link} from 'react-router-dom'

function Footer(){
    return(
        <div>
            <p className="footer">Coding Hunt
                <i className="fa fa-copyright"></i>
            </p>
            {/*
                <Link to='/about' >About</Link>
            */}
        </div>
    )
}

export default Footer;