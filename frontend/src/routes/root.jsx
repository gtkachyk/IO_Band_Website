import NavBar from "../Components/NavBar";
import SocialMediaBar from "../Components/root/SocialMediaBar";
import GuestBook from "../Components/root/GuestBook";
import Slideshow from "../Components/root/Slideshow";
import ContentUnit from "../Components/ContentUnit.jsx";
import MainContainer from "../Components/MainContainer.jsx";
import AlbumLink from "../Components/AlbumLink.jsx";
import React, { useEffect, useState } from 'react';
import '../styles/root/root.scss';
import '../styles/root/embedded_tiktok.scss';
import { fetchData } from '../js/api';
import { TikTokEmbed } from 'react-social-media-embed';
import { home } from '../assets/home.js';

function Root() {
    // State variables
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get data from api
    useEffect(() => {
      fetchData(['albums/' + home.featured_audio_media.name], setData, setLoading);
    }, []);

    if (loading) {
      return (<>Loading...</>);
    }

    // Process data from api
    const featured_album = data[0];
    const contentUnits = [
      // Home page example
      {
        title: 'Intentional Offence',
        columns: [
          {header: 'Long album name: \'II 0 II III\' - Out Now!', content: <AlbumLink title={featured_album.display_name} image={home.featured_audio_media.image} link={home.featured_audio_media.link} styleSheet={`../styles/root/album_link.scss`}></AlbumLink>, id: 'featured-column-1'},
          {header: 'From the Network', content: <TikTokEmbed className="featured-tiktok" url={home.featured_social_media.tiktok}/>, id: 'featured-column-2'},
        ],
      },
      {
        title: 'Offensive Content',
        columns: [
          {header: 'Guestbook', content: <GuestBook></GuestBook>, id: 'guestbook-column'},
        ],
      },
      {
        columns: [
          {header: 'Grotesque Beings', content: <Slideshow></Slideshow>, id: 'grotesque-beings-column'},
        ],
      },
      // Music page example
      {
        title: 'Albums Page',
        columns: [
          { content: '*Insert album link*', width: '50%' },
          { content: '*Insert album link*', width: '50%' },
          { content: '*Insert album link*', width: '50%' },
          { content: '*Insert album link*', width: '50%' },
        ],
      },
    ];

    return (
      <>
        <NavBar></NavBar>
        <SocialMediaBar></SocialMediaBar>
        <MainContainer styleSheet={`../styles/root/content_unit.scss`}>
          <ContentUnit title={contentUnits[0].title} columns={contentUnits[0].columns}></ContentUnit>
          <ContentUnit title={contentUnits[1].title} columns={contentUnits[1].columns}></ContentUnit>
          <ContentUnit title={contentUnits[2].title} columns={contentUnits[2].columns}></ContentUnit>
          <ContentUnit title={contentUnits[3].title} columns={contentUnits[3].columns}></ContentUnit>
        </MainContainer>
      </>
    );
}

export default Root;