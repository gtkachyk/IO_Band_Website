import NavBar from "../Components/NavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faItunes, faItunesNote, faSoundcloud, faTiktok } from '@fortawesome/free-brands-svg-icons'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { faBandcamp } from '@fortawesome/free-brands-svg-icons'
import { InstagramEmbed, TikTokEmbed } from 'react-social-media-embed';
// import IframeResizer from "iframe-resizer-react";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";


function Root() {

    // Featured audio media constants
    const featured_album_id = "1";
    const featured_audio_media = "http://localhost:5173/music/the_depths";

    // Social media links
    const featured_tiktok = "https://www.tiktok.com/embed/7305519091761073414";
    const featured_instagram = "https://www.instagram.com/p/CrAjRCuu3Sr/";

    // Set page background
    const page_resource_path = "./public/images/home_page/";
    useEffect(() => { document.body.style.backgroundImage = `url('${page_resource_path + "images/page_background_home_2.jpg"}')`}, []);

    // Get featured album
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchData = async (endpoints) => {
        try {
            const responses = await Promise.all(
                endpoints.map(async (endpoint) => {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`);
                    if (!response.ok) {
                        throw new Error(`Network response was not ok for endpoint: ${endpoint}`);
                    }
                    return response.json();
                })
            );

            setData(responses);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data: ', error);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData(['albums/' + featured_album_id]);
    }, []);

    if (loading) {
        return (<>Loading...</>);
    }
    const featured_album = data[0];
    const featured_album_resource_path = "./" + featured_album.path;
    const featured_album_preview_image_path = featured_album_resource_path + "/images/featured_album_preview_artwork_1.jpg";

    return (
        <>
            <NavBar></NavBar>
            <div className="home-page-container">
                <div className="home-page-content">
                    <div className="featured-content-title-div"><h2 className = "featured-content-title-h2">Featured Content</h2></div>
                    <div className="featured-content-container">
                        <table className="featured-content-table">
                            <tbody>
                                <tr>
                                    <th className="featured-table-col-1">
                                        <h2 className = "featured-content-table-audio-h2">'Audio Based Media' - Out Now!</h2>
                                        <div className="featured-content-table-audio-div">
                                            <a href={featured_audio_media}>
                                                <div className="featured-content-table-audio-div-container" style={{ backgroundImage: `url('${featured_album_preview_image_path}')` }}>
                                                    <span className="caption">{featured_album.display_name}</span>
                                                </div>
                                            </a>
                                        </div>
                                    </th> 
                                    <th className="featured-table-col-2">
                                        <h2 className = "featured-content-table-social-h2">From the Network</h2>
                                        <div className="featured-content-table-social-container">
                                            <iframe className="featured-content-table-tiktok" src={featured_tiktok}></iframe>
                                            {/*<div className="featured-content-table-tiktok-cover"></div> Only used to get rid of small white line on top of iframe*/}
                                        </div>
                                    </th>
                                    {/* <th className="featured-table-col-3">
                                        <InstagramEmbed url={featured_instagram} width={374}/>
                                    </th> */}
                                </tr>
                            </tbody>
                        </table>
                     </div>
                     <div className="offensive-content-title-div"><h2 className = "offensive-content-title-h2">Offensive Content</h2></div>
                     <div className="offensive-content-table-container">
                         {/* <table className="offensive-content-table">
                             <tr>
                                 <th className="offensive-table-col-1">
                                     <iframe  width="324" height="579"
                                         src="https://www.tiktok.com/embed/7305519091761073414">
                                     </iframe>
                                 </th> 
                                 <th className="offensive-table-col-2">
                                     <IframeResizer 
                                         log
                                         src="https://www.youtube.com/embed/CpdagzjptPs?si=AammjKOio2kkXC5g"
                                         style={{ width: '100%', minWidth: '761px', height: '579px'}}>
                                     </IframeResizer>
                                     <iframe width="761" height="579"
                                         src="https://www.youtube.com/embed/CpdagzjptPs?si=AammjKOio2kkXC5g">
                                     </iframe> 
                                 </th>
                                 <th className="offensive-table-col-3">
                                     <InstagramEmbed url="https://www.instagram.com/p/CrAjRCuu3Sr/" width={374}/>
                                 </th>
                             </tr>
                         </table> */}
                     </div>
                     <div className="footer-div"></div>
                </div>
            </div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/font-awesome.min.css"></link>
            <div className="icon-bar">
                <a href="https://www.youtube.com/@intentionaloffence2099" className="youtube"><i className="fa fa-youtube"></i></a>
                <a href="https://www.tiktok.com/@intentionaloffence" className="tiktok"><FontAwesomeIcon icon={faTiktok} /></a>
                <a href="https://www.instagram.com/intentionaloffence/" className="instagram"><i className="fa fa-instagram"></i></a>
                <a href="https://open.spotify.com/artist/3cl6MWGwsUu0dC9x1hC5E5" className="spotify"><FontAwesomeIcon icon={faSpotify} /></a>
                <a href="https://music.apple.com/us/artist/intentional-offence/1564051231" className="apple-music"><FontAwesomeIcon icon={faItunesNote} /></a>
                <a href="https://intentionaloffence.bandcamp.com/?from=search&search_item_id=3038049766&search_item_type=b&search_match_part=%3F&search_page_id=3117453889&search_page_no=0&search_rank=4&logged_in_menubar=true" className="bandcamp"><FontAwesomeIcon icon={faBandcamp} /></a>
                <a href="https://soundcloud.com/grant-tkachyk-495236786" className="soundcloud"><FontAwesomeIcon icon={faSoundcloud} /></a>
            </div> 
        </>
    );
}

export default Root;