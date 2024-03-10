import parse from 'html-react-parser';

function AlbumPlayer({album, source_tags, div_tags, audio_path}){
    return(
        <div className="container">
            <audio id="audio" preload="none" tabIndex="0">
                {parse(source_tags)}
                Your browser does not support HTML5 audio.
            </audio>

            <div className="player">
                <div className="large-toggle-btn" id={"large-toggle-btn-" + album.id}>
                    <i className="large-play-btn" id={"large-play-btn-" + album.id}><span className="screen-reader-text">Large toggle button</span></i>
                </div>

                <div className="info-box">
                    <div className="track-info-box">
                        <div className="track-title-text" id={"track-title-text-" + album.id}></div>
                        <div className="audio-time" id={"audio-time-" + album.id}>
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
                    <i className="previous-track-btn disabled" id={"previous-track-btn-" + album.id}><span className="screen-reader-text">Previous track button</span></i>&nbsp;
                    <i className="next-track-btn" id={"next-track-btn-" + album.id}><span className="screen-reader-text">Next track button</span></i>
                </div>
            </div>

            <div className="play-list" id={"play-list-" + album.id}>
                {parse(div_tags)}
                {/* {album_songs.map((song, index) => (
                    <div key={index} className="play-list-row" data-track-row={index + 1}>
                        <div className="small-toggle-btn">
                            <i className="small-play-btn"><span className="screen-reader-text">Small toggle button</span></i>
                        </div>
                        <div className="track-number">{index + 1}.&nbsp;</div>
                        <div className="track-title">
                            <a className="playlist-track" href="#" data-play-track={index + 1} style={{PointerEvents: 'none'}}>{song.name}</a>
                        </div>
                    </div>
                ))} */}
            </div>
        </div>
    );
}

export default AlbumPlayer;
