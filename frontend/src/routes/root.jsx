import NavBar from "../Components/NavBar";
import SocialMediaBar from "../Components/root/SocialMediaBar";
import GuestBook from "../Components/root/GuestBook";
import Slideshow from "../Components/root/Slideshow";
import React, { useEffect, useState } from 'react';
import '../styles/root/root.scss';
import { fetchData } from '../js/api';
import { TikTokEmbed } from 'react-social-media-embed';
import { home } from '../assets/home.js';

function Root() {
    // State variables
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Set page background
    useEffect(() => { document.body.style.backgroundImage = `url('${home.background_image}')`}, []);

    // Get data from api
    useEffect(() => {
        fetchData(['albums/' + home.featured_audio_media.name], setData, setLoading);
    }, []);

    if (loading) {
        return (<>Loading...</>);
    }

    // Process data from api
    const featured_album = data[0];

    return (
        <>
            <NavBar></NavBar>
            <div className="home-page-container">
                <div className="home-page-content-container">
                    <div className="featured-content-title-container"><h2 className = "featured-content-title">Featured Content</h2></div>
                    <div className="featured-content-container">
                        <table className="featured-content-table">
                            <tbody>
                                <tr>
                                    <th className="featured-col-1"> {/* Featured music */}
                                        <h2 className = "featured-col-1-title">'{featured_album.display_name}' - Out Now!</h2>
                                        <div className="featured-col-1-content-container">
                                            <a href={home.featured_audio_media.link}>
                                                <div className="featured-col-1-link-div" style={{ backgroundImage: `url('${home.featured_audio_media.image}')` }}>
                                                    <span className="featured-col-1-link-caption">{featured_album.display_name}</span>
                                                </div>
                                            </a>
                                        </div>
                                    </th> 
                                    <th className="featured-col-2"> {/* Featured social media */}
                                        <h2 className = "featured-col-2-title">From the Network</h2>
                                        <div className="featured-col-2-content-container">
                                            <TikTokEmbed className="featured-col-2-tiktok" url={home.featured_social_media.tiktok}/>
                                        </div>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                     </div>
                     <div className="offensive-content-title-container"><h2 className = "offensive-content-title">Offensive Content</h2></div>
                     <div className="offensive-content-container">
                        <table className="offensive-content-table">
                            <tbody>
                                <tr>
                                    <th className="offensive-row-1"> {/* Guestbook */}
                                        <h2 className ="offensive-row-1-title">Guestbook</h2>
                                        <div className ="offensive-row-1-content-container">
                                            <GuestBook></GuestBook>
                                        </div>
                                    </th>
                                </tr>
                                <tr>
                                    <th className="offensive-row-2">
                                        <h2 className ="offensive-row-2-title">Grotesque Beings</h2>
                                        <div className ="offensive-row-2-content-container">
                                            <Slideshow></Slideshow>
                                        </div>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                     </div>
                     <div className="footer"></div>
                </div>
            </div>
            <SocialMediaBar></SocialMediaBar>
        </>
    );
}

export default Root;