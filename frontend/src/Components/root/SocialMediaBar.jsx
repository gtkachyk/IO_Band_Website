import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faItunesNote, faSoundcloud, faTiktok, faSpotify, faBandcamp } from '@fortawesome/free-brands-svg-icons'
import '../../styles/root/social_media_bar.scss';

function SocialMediaBar () {
    return (
        <>
            <div className="social-media-bar">
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

export default SocialMediaBar;