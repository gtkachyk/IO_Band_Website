import '../../styles/root/slideshow.scss';
import { useEffect } from 'react';

function Slideshow (){
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '../../src/js/slideshow.js';
        script.async = true;
        document.body.appendChild(script)   
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    /* Code adapted from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_slideshow_auto */
    return (
        <>
            <div className="slideshow-container">
                <div className="mySlides fade">
                  <img className="slideshow-img" src="../public/images/home_page/images/slideshow/serj.jpg"></img>
                </div>
                <div className="mySlides fade">
                  <img className="slideshow-img" src="../public/images/home_page/images/slideshow/alien_2.jpg"></img>
                </div>
                <div className="mySlides fade">
                  <img className="slideshow-img" src="../public/images/home_page/images/slideshow/alien_3.jpg"></img>
                </div>
            </div>
        </>
    );
}

export default Slideshow;