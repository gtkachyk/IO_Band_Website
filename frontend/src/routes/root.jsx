import NavBar from "../Components/NavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faItunesNote, faSoundcloud, faTiktok } from '@fortawesome/free-brands-svg-icons'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { faBandcamp } from '@fortawesome/free-brands-svg-icons'
import React, { useEffect, useState, useRef } from 'react';
import '../styles/root.scss';
import { v4 as uuidv4 } from 'uuid';
import Axios from "axios";

function Root() {
    // Generate uuid
    const uuidRef = useRef(uuidv4());
    console.log("uuidRef.current = " + uuidRef.current);
    
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
        fetchData(['albums/' + featured_album_id, 'songs/']);
    }, []);

    if (loading) {
        return (<>Loading...</>);
    }
    const featured_album = data[0];
    const songs = data[1];
    const featured_album_resource_path = "./" + featured_album.path;
    const featured_album_preview_image_path = featured_album_resource_path + "/images/featured_album_preview_artwork_1.jpg";

    // Functions for sending guest book entries
    const postGuestBookEntry = (user_uuid, name, message, date) => {
        Axios.post(`${import.meta.env.VITE_API_URL}guest_book_entries/`, {
            'user_uuid': user_uuid,
            'name': name,
            'message': message,
            'date': date
        },
        {
            headers: {
                "Authorization": `AUTHORIZATION_KEY`,
                "Content-Type": 'application/json'
            }
        })
        .then(res => console.log(res))
        .catch(error => console.error(error))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const name = event.target.elements.name.value;
        const message = event.target.elements.message.value;
        const date = new Date().toLocaleDateString() + " at " + new Date().toLocaleTimeString();

        // Send post request
        postGuestBookEntry(uuidRef.current, name, message, date);

        // Clear form fields
        event.target.reset();
    }

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
                                    <th className="featured-col-1">
                                        <h2 className = "featured-col-1-title">'{featured_album.display_name}' - Out Now!</h2>
                                        <div className="featured-col-1-content-container">
                                            <a href={featured_audio_media}>
                                                <div className="featured-col-1-link-div" style={{ backgroundImage: `url('${featured_album_preview_image_path}')` }}>
                                                    <span className="featured-col-1-link-caption">{featured_album.display_name}</span>
                                                </div>
                                            </a>
                                        </div>
                                    </th> 
                                    <th className="featured-col-2">
                                        <h2 className = "featured-col-2-title">From the Network</h2>
                                        <div className="featured-col-2-content-container">
                                            <iframe className="featured-col-2-tiktok" src={featured_tiktok}></iframe>
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
                                    <th className="offensive-col-1"> {/* Slide show */}
                                    </th>
                                    <th className="offensive-col-2"> {/* Guestbook */}
                                        <h2 className ="offensive-col-2-title">Guestbook</h2>
                                        <div className ="offensive-col-2-content-container">
                                            <textarea className="guestbook-display" readOnly></textarea>
                                            <form className="guestbook-form" onSubmit={handleSubmit}>
                                                <input className="guestbook-name" type="text" id="name" name="name" placeholder="Name" required />
                                                <textarea className="guestbook-message" id="message" name="message" maxLength="400" placeholder="Message" required />
                                                <button className="guestbook-submit" type="submit">Submit</button>
                                            </form>
                                        </div>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                     </div>
                     <div className="footer"></div>
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