import NavBar from "../Components/NavBar";
import React, { useEffect } from 'react';

function About(){
    const page_resource_path = "./public/images/about_page/";
    useEffect(() => { document.body.style.backgroundImage = `url('${page_resource_path + "images/page_background_about.jpg"}')`}, []);
    return(
        <>
            <NavBar></NavBar>
            <h1 id= "test-header"> This is the about page.</h1>
        </>
    );
}

export default About;