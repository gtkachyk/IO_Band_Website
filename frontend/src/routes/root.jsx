import NavBar from "../Components/NavBar";
import SocialMediaBar from "../Components/root/SocialMediaBar";
import GuestBook from "../Components/root/GuestBook";
import Slideshow from "../Components/root/Slideshow";
import React, { useEffect, useState } from 'react';
import '../styles/root/root.scss';
import { fetchData } from '../js/api';
import { TikTokEmbed } from 'react-social-media-embed';

function Root() {
    // State variables
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Featured audio media constants
    const featured_album_id = "1";
    const featured_audio_media = "http://localhost:5173/music/the_depths";

    // Social media links
    const featured_tiktok = "https://www.tiktok.com/@intentionaloffence/video/7305519091761073414";
    const featured_instagram = "https://www.instagram.com/p/CrAjRCuu3Sr/";

    // Set page background
    const page_resource_path = "./public/images/home_page/";
    useEffect(() => { document.body.style.backgroundImage = `url('${page_resource_path + "images/page_background_home_2.jpg"}')`}, []);

    // Get data from api
    useEffect(() => {
        fetchData(['albums/' + featured_album_id], setData, setLoading);
    }, []);

    if (loading) {
        return (<>Loading...</>);
    }

    // Process data from api
    const featured_album = data[0];
    const featured_album_resource_path = "./" + featured_album.path;
    const featured_album_preview_image_path = featured_album_resource_path + "/images/featured_album_preview_artwork_1.jpg";

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
                                            <a href={featured_audio_media}>
                                                <div className="featured-col-1-link-div" style={{ backgroundImage: `url('${featured_album_preview_image_path}')` }}>
                                                    <span className="featured-col-1-link-caption">{featured_album.display_name}</span>
                                                </div>
                                            </a>
                                        </div>
                                    </th> 
                                    <th className="featured-col-2"> {/* Featured social media */}
                                        <h2 className = "featured-col-2-title">From the Network</h2>
                                        <div className="featured-col-2-content-container">
                                            <TikTokEmbed className="featured-col-2-tiktok" url={featured_tiktok}/>
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