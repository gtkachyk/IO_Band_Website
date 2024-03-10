import NavBar from "../Components/NavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faItunes, faItunesNote, faSoundcloud, faTiktok } from '@fortawesome/free-brands-svg-icons'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { faBandcamp } from '@fortawesome/free-brands-svg-icons'
import { InstagramEmbed } from 'react-social-media-embed';
// import IframeResizer from "iframe-resizer-react";
import React, { useEffect } from 'react';
import bg from '/src/images/IO Map (Custom).jpg';

function Root() {
    useEffect(() => { document.body.style.backgroundImage = `url('${bg}')`}, []);
    return (
        <>
            <NavBar></NavBar>
            <div className="home-page-container">
                <div className="home-page-content">
                    <div className="top-padding">

                    </div>
                    <div className="featured-content-container">
            
                     </div>
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
                     <div className="bottom-padding">

                    </div>
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