import NavBar from '../Components/NavBar';
import React, { useEffect } from 'react';
import '../styles/video.scss';
import { video } from '../assets/video.js';

function Video () {
  // Set page background
  useEffect(() => {
    document.body.style.backgroundImage = `url('${video.background_image}')`;
  }, []);
  return (
    <>
      <div className="video-page-container">
        <NavBar></NavBar>
        <div className="video-table-container">
          <table className="video-table">
            <tr className="video-table-row">
              <iframe className="video-left-col" width="650" height="375" src="https://www.youtube.com/embed/CpdagzjptPs?si=AammjKOio2kkXC5g"></iframe>
              <td width="30"></td>
              <iframe className="video-right-col" width="650" height="375" src="https://www.youtube.com/embed/aR2ApyKbkt4?si=maTpl04t2jZcza4l"></iframe>
            </tr>
            <tr height="10"></tr>
            <tr className="video-table-row">
              <iframe className="video-left-col" width="650" height="375" src="https://www.youtube.com/embed/B7zLzb07qtA?si=aOoQJRgLfYujUg8_"></iframe>
              <td width="30"></td>
              <iframe className="video-right-col" width="650" height="375" src="https://www.youtube.com/embed/Ad0OSTadbOY?si=2sAO228VID4mR3G0"></iframe>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}

export default Video;
