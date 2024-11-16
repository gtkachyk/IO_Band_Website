import { home } from '../assets/home.js';

export function generateSlideshowHTML() {
  var html = '';
  for (var i = 0; i < home.slideshow_images.length; i++) {
    /* Code adapted from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_slideshow_auto */
    html +=
      `<div className=\"mySlides fade\">
                    <img className=\"slideshow-img\" src=\"` +
      home.slideshow_images[i] +
      `\"></img>
                </div>`;
  }
  return html;
}

export function startSlideshow() {
  let slideIndex = 0;
  showSlides();

  function showSlides() {
    let i;
    let slides = document.getElementsByClassName('mySlides');

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = 'block';
    setTimeout(showSlides, 5000);
  }
}
