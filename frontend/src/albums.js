const the_depths = {
    id: 1,
    name: "the_depths",
};

const demos = {
    id: 2,
    name: "demos",
};

const albums = [the_depths, demos];

export async function getAlbumByName(name) {
    for(let i = 0; i < albums.length; i++){
        if(albums[i].name == name){
            return albums[i];
        }
    }
    return null;
};

export function getAlbumSongs(songs, album){
    var album_songs = [];
    for(var i = 0; i < songs.length; i++){
        if(songs[i].album === album.id){
            album_songs.push(songs[i]);
        }
    }
    return album_songs;
}

export function generatePlaylistHTML(album, album_songs){
    var source_tags = ``;
    var div_tags = ``;
    for(var i = 0; i < album_songs.length; i++){
        var display_name = album_songs[i].name;
        if (display_name.length > 50){
            display_name = display_name.slice(0, 47) + "...";
        }

        source_tags += `<source src=${"\"..\\" + album.path + '/audio/' + album_songs[i].audio_file_name + "\""} type="audio/wav" data-track-number=${"\"" + album_songs[i].track_number + "\""}/>`;
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

export function generateDownloadableArtPreviewPairs(downloadable_art_string, album_path){
    const downloadable_artwork = downloadable_art_string.split(',');
    const downloadable_artwork_folder_path = album_path + '/images/downloadable/';
    var artwork_preview_pairs = [];
    for(var i = 0; i < downloadable_artwork.length; i++){
        const current_art = downloadable_artwork[i];
        const current_art_split = current_art.split('.');
        const current_art_file_extension = current_art_split[current_art_split.length - 1];
        artwork_preview_pairs.push([downloadable_artwork_folder_path + current_art, downloadable_artwork_folder_path + current_art.substring(0, current_art.lastIndexOf('.')) + '_preview.' + current_art_file_extension]);
    }
    return artwork_preview_pairs;
}