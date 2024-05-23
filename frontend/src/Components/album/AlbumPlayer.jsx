import parse from 'html-react-parser';
import '../../styles/album/album_player.css';

function AlbumPlayer({source_tags, div_tags}) {

    if (source_tags.length == 0 || div_tags.length == 0){
        return (
            <h3 className="album-player-na"> N/A </h3>
        );
    }

    /* Code adapted from https://codepen.io/craigstroman/pen/aOyRYx */
    return (
        <div className="container">
            <audio id="audio" preload="none" tabIndex="0">
                {parse(source_tags)}
                Your browser does not support HTML5 audio.
            </audio>

            <div className="player">
                <div className="large-toggle-btn">
                    <i className="large-play-btn"><span className="screen-reader-text">Large toggle button</span></i>
                </div>

                <div className="info-box">
                    <div className="track-info-box">
                        <div className="track-title-text"></div>
                        <div className="audio-time">
                            <span className="current-time">00:00</span> /&nbsp;
                            <span className="duration">00:00</span>
                        </div>
                    </div>

                    <div className="progress-box">
                        <div className="progress-cell">
                            <div className="progress">
                                <div className="progress-buffer"></div>
                                <div className="progress-indicator"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="controls-box">
                    <i className="previous-track-btn disabled"><span className="screen-reader-text">Previous track button</span></i>&nbsp;
                    <i className="next-track-btn"><span className="screen-reader-text">Next track button</span></i>
                </div>
            </div>

            <div className="play-list">
                {parse(div_tags)}
            </div>
        </div>
    );
}

export default AlbumPlayer;
