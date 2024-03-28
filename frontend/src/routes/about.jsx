import NavBar from "../Components/NavBar";
import React, { useEffect } from 'react';
import '../styles/about.scss';

function About(){
    const page_resource_path = "./public/images/about_page/";
    useEffect(() => { document.body.style.backgroundImage = `url('${page_resource_path + "images/page_background_about_2.jpg"}')`}, []);
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