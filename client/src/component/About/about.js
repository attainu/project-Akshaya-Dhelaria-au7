import React,{Fragment} from 'react';
import './about.css'

function About(){
    return(
        <Fragment>
            <div className="tag-line">  
                <h3 className="heading">Our goal is to make online education <br /> available for everyone.</h3>
            </div>

            <div className="about-us">
                <h2 className="heading-about-us">About Us</h2>
                <p className="para-about-us">We at Coding Hunt aggregate courses from many providers to make it easy to find the best courses on almost any subject, wherever they exist on the web. 
                <br />
                <br />
                Our aim is to provide an unbiased platform for learners to discover the best sources to learn a new skill. Coding Hunt lets learners identify the most suitable course of their choice by allowing them to filter courses by fee, course type (video/ebook etc.), spoken language, course reviews etc.
                <br />
                <br />

                All our submissions are completely crowd sourced. The Coding Hunt team merely acts as a gatekeeper to ensure that only high quality submissions are approved and our users get the best possible experience on our platform.
                <br />
                <br />
                    
                Coding Hunt is constantly evolving and we’re trying to make our platform better and more useful for our learners and educators around the world. If you have any suggestions on how to make Coding Hunt more useful for you, do get in touch.
                </p>
            </div>
        </Fragment>
    )
}

export default About;