import NavBar from "../Components/NavBar";
import React, { useEffect } from 'react';
import '../styles/about.scss';
import { about } from '../assets/about.js';

function About(){
    // Set page background
    useEffect(() => { document.body.style.backgroundImage = `url('${about.background_image}')`}, []);
    return(
        <>
            <NavBar></NavBar>
            <div className="about-page-container">
                <div className="about-page-content">
                    <div className="about-page-top-padding">

                    </div>
                    <div className="about-page-featured-content-container">
            
                     </div>
                     <div className="about-page-offensive-content-table-container">
                     </div>
                     <div className="about-page-bottom-padding">

                    </div>
                </div>
            </div>
        </>
    );
}

export default About;