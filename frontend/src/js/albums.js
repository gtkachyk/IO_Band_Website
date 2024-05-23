export function generatePlaylistHTML(album, album_songs) {
    var source_tags = ``;
    var div_tags = ``;
    for (var i = 0; i < album_songs.length; i++) {
        var display_name = album_songs[i].name;
        if (display_name.length > 50) {
            display_name = display_name.slice(0, 47) + "...";
        }

        source_tags += `<source src=${"\"..\\public/audio/" + album.name + '/' + album_songs[i].audio_file_name + "\""} type="audio/wav" data-track-number=${"\"" + album_songs[i].track_number + "\""}/>`;
        div_tags += `<div className=\"playlist-row-content-container\">
                        <div className=\"play-list-row\" data-track-row=${"\"" + album_songs[i].track_number + "\""}>
                            <div className=\"small-toggle-btn\">
                                <i className=\"small-play-btn\">
                                    <span className=\"screen-reader-text\">Small toggle button</span>
                                </i>
                            </div>
                            <div className=\"track-number\">
                                <pre className=\"track-number-inner\"> ${album_songs[i].track_number}. </pre>
                            </div>
                            <div className=\"track-title\">
                                <a className=\"playlist-track\" href=\"#\" data-play-track=${"\"" + album_songs[i].track_number + "\""} style=\"pointer-events: none\">${display_name}</a>
                            </div>
                        </div>
                    </div>`;
    }
    return [source_tags, div_tags];
}
