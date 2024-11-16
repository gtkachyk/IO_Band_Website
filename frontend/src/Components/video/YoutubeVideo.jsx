import '../../styles/components/youtube-video.scss';

function YoutubeVideo({ link }) {
  return (
    <iframe className="youtube-video" src={link}></iframe>
  );
}

export default YoutubeVideo;