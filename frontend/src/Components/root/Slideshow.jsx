import '../../styles/root/slideshow.scss';
import { startSlideshow, generateSlideshowHTML } from '../../js/slideshow';
import { useEffect, useRef } from 'react';
import parse from 'html-react-parser';

function Slideshow (){
    const initialized = useRef(false) // Prevents hook logic from firing twice if double rendered

    useEffect(() => {
        if (!initialized.current) {
            startSlideshow();
            initialized.current = true
        }
    }, []);

    const html = generateSlideshowHTML();

    return (
        <>
            <div className="slideshow-container">
              {parse(html)}
            </div>
        </>
    );
}

export default Slideshow;