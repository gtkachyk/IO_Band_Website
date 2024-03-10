const theDepths = {
    id: 1,
    name: "The Depths",
    cover: "src\\images\\UFO_Album_Art (Custom).jpg",
    pageBackground: "/src/images/eso1132e.jpg",
    artwork: [["UFO", "/src/artwork/the_depths/UFO_album_art.jpg", "/src/artwork/the_depths/UFO_album_art_preview.jpg"], ["Whales (Krillionaire Mix)", "/src/artwork/the_depths/whales_album_art.jpg", "/src/artwork/the_depths/whales_album_art_preview.jpg"]],
    lyrics: ["/src/lyric_sheets/the_depths/ufo_lyrics.pdf", "/src/lyric_sheets/the_depths/whales_lyrics.pdf"],
    tabs: ["/src/tabs/the_depths/ufo_tab_test.pdf"],
    folder: "src\\audio_files\\the_depths",
    songs: `<source src="../src/audio_files/UFO.wav" type="audio/wav" data-track-number="1" />
            <source src="../src/audio_files/Whales (Krillionaire Mix).wav" type="audio/wav" data-track-number="2" />`,
    playlistCols:  `<div className="play-list-row" data-track-row="1">
                        <div className="small-toggle-btn">
                            <i className="small-play-btn"><span className="screen-reader-text">Small toggle button</span></i>
                        </div>
                        <div className="track-number">1.</div>
                        <div className="track-title">
                            <a className="playlist-track" href="#" data-play-track="1" style="pointer-events: none">UFO</a>
                        </div>
                    </div>
                    <div className="play-list-row" data-track-row="2">
                        <div className="small-toggle-btn">
                            <i className="small-play-btn"><span className="screen-reader-text">Small toggle button</span></i>
                        </div>
                        <div className="track-number">2.</div>
                        <div className="track-title">
                            <a className="playlist-track" href="#" data-play-track="2" style="pointer-events: none">Whales (Krillionaire Mix)</a>
                        </div>
                    </div>`
};

const unreleased = {
    id: 2,
    name: "Unreleased",
    cover: "src\\images\\Discord Profile Picture (Custom).png",
    pageBackground: "/src/images/Discord Profile Picture (Custom).png",
    artwork: [["Unreleased", "/src/artwork/unreleased/unreleased_album_art.png", "/src/artwork/unreleased/unreleased_album_art_preview.png"]],
    lyrics: [],
    tabs: [],
    folder: "src\\audio_files\\unreleased",
    songs: `<source src="../src/audio_files/Arctic Expedition (Instrumental) Mix 5.wav" type="audio/wav" data-track-number="1" />
            <source src="../src/audio_files/Let the Colosseum Crumble Instrumental (Mix 1).wav" type="audio/wav" data-track-number="2" />
            <source src="../src/audio_files/Mirage Mix 2.wav" type="audio/wav" data-track-number="3" />
            <source src="../src/audio_files/The Invasion Mix 2.wav" type="audio/wav" data-track-number="4" />
            <source src="../src/audio_files/Unidentifiable Catch (Instrumental) (Mix 3).wav" type="audio/wav" data-track-number="5" />
            <source src="../src/audio_files/Welcome to the Massacre.wav" type="audio/wav" data-track-number="6" />`,
    playlistCols:  `<div className="play-list-row" data-track-row="1">
                        <div className="small-toggle-btn">
                            <i className="small-play-btn"><span className="screen-reader-text">Small toggle button</span></i>
                        </div>
                        <div className="track-number">1.</div>
                        <div className="track-title">
                            <a className="playlist-track" href="#" data-play-track="1" style="pointer-events: none">Arctic Expedition (Instrumental) Mix 5</a>
                        </div>
                    </div>
                    <div className="play-list-row" data-track-row="2">
                        <div className="small-toggle-btn">
                            <i className="small-play-btn"><span className="screen-reader-text">Small toggle button</span></i>
                        </div>
                        <div className="track-number">2.</div>
                        <div className="track-title">
                            <a className="playlist-track" href="#" data-play-track="2" style="pointer-events: none">Let the Colosseum Crumble Instrumental (Mix 1)</a>
                        </div>
                    </div>
                    <div className="play-list-row" data-track-row="3">
                        <div className="small-toggle-btn">
                            <i className="small-play-btn"><span className="screen-reader-text">Small toggle button</span></i>
                        </div>
                        <div className="track-number">3.</div>
                        <div className="track-title">
                            <a className="playlist-track" href="#" data-play-track="3" style="pointer-events: none">Mirage Mix 2</a>
                        </div>
                    </div>
                    <div className="play-list-row" data-track-row="4">
                        <div className="small-toggle-btn">
                            <i className="small-play-btn"><span className="screen-reader-text">Small toggle button</span></i>
                        </div>
                        <div className="track-number">4.</div>
                        <div className="track-title">
                            <a className="playlist-track" href="#" data-play-track="4" style="pointer-events: none">The Invasion Mix 2</a>
                        </div>
                    </div>
                    <div className="play-list-row" data-track-row="5">
                        <div className="small-toggle-btn">
                            <i className="small-play-btn"><span className="screen-reader-text">Small toggle button</span></i>
                        </div>
                        <div className="track-number">5.</div>
                        <div className="track-title">
                            <a className="playlist-track" href="#" data-play-track="5" style="pointer-events: none">Unidentifiable Catch (Instrumental) (Mix 3)</a>
                        </div>
                    </div>
                    <div className="play-list-row" data-track-row="6">
                        <div className="small-toggle-btn">
                            <i className="small-play-btn"><span className="screen-reader-text">Small toggle button</span></i>
                        </div>
                        <div className="track-number">6.</div>
                        <div className="track-title">
                            <a className="playlist-track" href="#" data-play-track="6" style="pointer-events: none">Welcome to the Massacre</a>
                        </div>
                    </div>`
};

const albums = [theDepths, unreleased];

export async function getAlbums() {
    return albums;
};

export async function getAlbum(id) {
    for(let i = 0; i < albums.length; i++){
        if(albums[i].id == id){
            return albums[i];
        }
    }
    return null;
};