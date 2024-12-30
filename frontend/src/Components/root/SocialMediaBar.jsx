import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faItunesNote, faSoundcloud, faTiktok, faSpotify, faBandcamp, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import '../../styles/components/social_media_bar.scss';

function SocialMediaBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Track screen width and apply automatic collapse if <= 500px
  useEffect(() => {
    const handleResize = () => {
      const shouldCollapse = window.innerWidth <= 500 || window.innerHeight <= 580;
      setIsCollapsed(true); // Automatically collapse when resizing
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle collapse manually
  const toggleCollapse = () => setIsCollapsed((prevState) => !prevState);

  return (
    <div className={`social-media-bar ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="collapse-toggle" onClick={toggleCollapse}>
        <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} className='collapse-icon' />
      </button>
      <a href="https://www.youtube.com/@intentionaloffence2099" className="youtube">
        <FontAwesomeIcon icon={faYoutube} className='youtube-icon'/>
      </a>
      <a href="https://www.tiktok.com/@intentionaloffence" className="tiktok">
        <FontAwesomeIcon icon={faTiktok} className='tiktok-icon' />
      </a>
      <a href="https://www.instagram.com/intentionaloffence/" className="instagram">
        <FontAwesomeIcon icon={faInstagram} className='instagram-icon' />
      </a>
      <a href="https://open.spotify.com/artist/3cl6MWGwsUu0dC9x1hC5E5" className="spotify">
        <FontAwesomeIcon icon={faSpotify} className='spotify-icon' />
      </a>
      <a href="https://music.apple.com/us/artist/intentional-offence/1564051231" className="apple-music">
        <FontAwesomeIcon icon={faItunesNote} className='itunes-icon' />
      </a>
      <a href="https://intentionaloffence.bandcamp.com/" className="bandcamp">
        <FontAwesomeIcon icon={faBandcamp} className='bandcamp-icon' />
      </a>
      <a href="https://soundcloud.com/grant-tkachyk-495236786" className="soundcloud">
        <FontAwesomeIcon icon={faSoundcloud} className='soundcloud-icon' />
      </a>
    </div>
  );
}

export default SocialMediaBar;
