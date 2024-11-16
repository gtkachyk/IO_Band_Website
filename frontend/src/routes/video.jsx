import NavBar from '../Components/NavBar';
import React, { useEffect } from 'react';
import '../styles/routes/video/local.scss';
import '../styles/routes/video/overwrite/main_container.scss'
import { video } from '../assets/video.js';
import MainContainer from '../Components/MainContainer.jsx';
import ContentUnit from '../Components/ContentUnit.jsx';
import YoutubeVideo from '../Components/video/YoutubeVideo.jsx';

function Video () {
  // Create content units
  const contentUnits = [
    {
      columns: [],
    },
  ];

  for (var i = 0; i < video.videos.length; i++) {
    contentUnits[0].columns.push({ content: <YoutubeVideo link={video.videos[i]}></YoutubeVideo>, id: 'youtube-column' });
  }

  return (
    <>
      <NavBar></NavBar>
      <MainContainer styleSheet={`../styles/routes/video/overwrite/content_unit.scss`}>
        <ContentUnit title={contentUnits[0].title} columns={contentUnits[0].columns}></ContentUnit>
      </MainContainer>
    </>
  );
}

export default Video;
