import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faItunesNote, faSoundcloud, faTiktok, faSpotify, faBandcamp } from '@fortawesome/free-brands-svg-icons';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import '../../styles/root/social_media_bar.scss';

function SocialMediaBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Track screen width and apply automatic collapse if <= 500px
  useEffect(() => {
    const handleResize = () => {
      const shouldCollapse = window.innerWidth <= 500;
      setIsCollapsed(shouldCollapse); // Automatically collapse at mobile width
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
        <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} />
      </button>
      <a href="https://www.youtube.com/@intentionaloffence2099" className="youtube">
        <i className="fa fa-youtube"></i>
      </a>
      <a href="https://www.tiktok.com/@intentionaloffence" className="tiktok">
        <FontAwesomeIcon icon={faTiktok} />
      </a>
      <a href="https://www.instagram.com/intentionaloffence/" className="instagram">
        <i className="fa fa-instagram"></i>
      </a>
      <a href="https://open.spotify.com/artist/3cl6MWGwsUu0dC9x1hC5E5" className="spotify">
        <FontAwesomeIcon icon={faSpotify} />
      </a>
      <a href="https://music.apple.com/us/artist/intentional-offence/1564051231" className="apple-music">
        <FontAwesomeIcon icon={faItunesNote} />
      </a>
      <a href="https://intentionaloffence.bandcamp.com/" className="bandcamp">
        <FontAwesomeIcon icon={faBandcamp} />
      </a>
      <a href="https://soundcloud.com/grant-tkachyk-495236786" className="soundcloud">
        <FontAwesomeIcon icon={faSoundcloud} />
      </a>
    </div>
  );
}

export default SocialMediaBar;
