import NavBar from "../Components/NavBar";
import React, { useEffect } from 'react';
import bg from '/src/images/IO Map (Custom).jpg';

function About(){
    useEffect(() => { document.body.style.backgroundImage = `url('${bg}')`}, []);
    return(
        <>
            <NavBar></NavBar>
            <h1 id= "test-header"> This is the about page.</h1>
        </>
    );
}

export default About;