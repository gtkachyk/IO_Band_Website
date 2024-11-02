import NavBar from "../Components/NavBar";
import SocialMediaBar from "../Components/root/SocialMediaBar";
import GuestBook from "../Components/root/GuestBook";
import Slideshow from "../Components/root/Slideshow";
import ContentUnit from "../Components/ContentUnit.jsx";
import MainContainer from "../Components/MainContainer.jsx";
import AlbumLink from "../Components/AlbumLink.jsx";
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
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

    // Set page background
    // useEffect(() => { document.body.style.backgroundImage = `url('${home.background_image}')`}, []);

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
          { header: 'Long album name: \'II 0 II III\' - Out Now!', content: <AlbumLink title={featured_album.display_name} image={home.featured_audio_media.image} link={home.featured_audio_media.link} styleSheet={`../styles/root/album_link.scss`}></AlbumLink>, width: '55%' },
          { header: 'From the Network', content: <TikTokEmbed className="featured-tiktok" url={home.featured_social_media.tiktok}/>, width: '45%' },
        ],
      },
      {
        title: 'Offensive Content',
        columns: [
          { header: 'Guestbook', content: <GuestBook></GuestBook>},
        ],
      },
      {
        columns: [
          { header: 'Grotesque Beings', content: <Slideshow></Slideshow> },
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
      // Album page example
      {
          title: 'Album Page',
          columns: [
            { header: 'Tracks', content: 'This is the content for column 1, this column has a lot of content @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#####', width: '40%' },
            { header: 'Artwork', content: 'This is the content for column 2', width: '20%'},
            { header: 'Lyric Sheets', content: 'This is the content for column 3', width: '20%' },
            { header: 'Tabs', content: 'This is the content for column 4', width: '20%' },
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
          <ContentUnit title={contentUnits[4].title} columns={contentUnits[4].columns}></ContentUnit> 
        </MainContainer>
      </>
        // <>
        //     <div className="home-page-container">
        //         <NavBar></NavBar>
        //         <div className="home-page-content-container">
        //             <div className="featured-content-title-container"><h2 className = "featured-content-title">Intentional Offence</h2></div>
        //             <div className="featured-content-container">
        //                 <table className="featured-content-table">
        //                     <tbody>
        //                         <tr>
        //                             <th className="featured-col-1"> {/* Featured music */}
        //                                 <h2 className = "featured-col-1-title">'{featured_album.display_name}' - Out Now!</h2>
        //                                 <div className="featured-col-1-content-container">
                                            // <a href={home.featured_audio_media.link}>
                                            //     <div className="featured-col-1-link-div" style={{ backgroundImage: `url('${home.featured_audio_media.image}')` }}>
                                            //         <span className="featured-col-1-link-caption">{featured_album.display_name}</span>
                                            //     </div>
                                            // </a>
        //                                 </div>
        //                             </th> 
        //                             <th className="featured-col-2"> {/* Featured social media */}
        //                                 <h2 className = "featured-col-2-title">From the Network</h2>
                                        // <div className="featured-col-2-content-container">
                                        //     <TikTokEmbed className="featured-col-2-tiktok" url={home.featured_social_media.tiktok}/>
                                        // </div>
        //                             </th>
        //                         </tr>
        //                     </tbody>
        //                 </table>
        //              </div>
        //              <div className="offensive-content-title-container"><h2 className = "offensive-content-title">Offensive Content</h2></div>
        //              <div className="offensive-content-container">
        //                 <table className="offensive-content-table">
        //                     <tbody>
        //                         <tr>
        //                             <th className="offensive-row-1"> {/* Guestbook */}
        //                                 <h2 className ="offensive-row-1-title">Guestbook</h2>
                                        // <div className ="offensive-row-1-content-container">
                                        //     <textarea className="invisible-textarea"></textarea>
                                        //     <GuestBook></GuestBook>
                                        // </div>
        //                             </th>
        //                         </tr>
        //                         <tr>
        //                             <th className="offensive-row-2">
        //                                 <h2 className ="offensive-row-2-title">Grotesque Beings</h2>
        //                                 <div className ="offensive-row-2-content-container">
        //                                     <Slideshow></Slideshow>
        //                                 </div>
        //                             </th>
        //                         </tr>
        //                     </tbody>
        //                 </table>
        //              </div>
        //              <div className="footer"></div>
        //         </div>
        //     </div>
        //     <SocialMediaBar></SocialMediaBar>
        // </>
    );
}

export default Root;