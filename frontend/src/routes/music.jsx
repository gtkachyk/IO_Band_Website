import NavBar from '../Components/NavBar';
import React, { useEffect, useState } from 'react';
import '../styles/routes/music/local.scss';
import { fetchData } from '../js/api';
import { music } from '../assets/music.js';
import ContentUnit from '../Components/ContentUnit.jsx';
import MainContainer from '../Components/MainContainer.jsx';
import AlbumLink from '../Components/AlbumLink.jsx';
import '../styles/routes/music/overwrite/content_unit.scss';
import '../styles/routes/music/overwrite/album_link.scss';

function Music () {
  // State variables
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get data from database
  useEffect(() => {
    fetchData(['albums/'], setData, setLoading);
  }, []);

  if (loading) {
    return <>Loading...</>;
  }
  const albums = data[0];

  // Create content units
  const contentUnits = [
    {
      columns: [],
    },
  ];

  for (var i = 0; i < albums.length; i++) {
    contentUnits[0].columns.push({ content: <AlbumLink title={albums[i].display_name} image={import.meta.env.VITE_ROUTES_PATH_TO_PUBLIC + 'images/albums/' + albums[i].name + '/music_link.jpg'} link={import.meta.env.VITE_WEBSITE_LINK + 'music/' + albums[i].name} styleSheet={`../styles/routes/music/overwrite/album_link.scss`}></AlbumLink>, id: 'link-column' });
  }

  return (
    <>
      <NavBar></NavBar>
      <MainContainer>
        <ContentUnit title={contentUnits[0].title} columns={contentUnits[0].columns}></ContentUnit>
      </MainContainer>
    </>
  );
}

export default Music;
