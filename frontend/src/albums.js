const the_depths = {
    id: 1,
    name: "the_depths",
    display_name: "The Depths",
    path: "public/images/music_page/album_page/the_depths",
    downloadable_artwork: "01_official_album_artwork_1.jpg,02_whales_album_art.jpg",
    songs: [{name: "UFO", album: 1, track_number: 1, song_id: "1,1", audio_file_name: "01_UFO.wav", tab_file_name: "01_ufo_tab_test.pdf", lyric_sheet_file_name: ""},
            {name: "Whales (Krillionaire Mix)", album: 1, track_number: 2, song_id: "1,2", audio_file_name: "02_Whales_(Krillionaire Mix).wav", tab_file_name: "", lyric_sheet_file_name: ""},
            {name: "Arctic Expedition (Instrumental)", album: 1, track_number: 3, song_id: "1,3", audio_file_name: "03_Arctic_Expedition_(Instrumental)_Mix 5.wav", tab_file_name: "", lyric_sheet_file_name: ""}]
};

const demos = {
    id: 2,
    name: "demos",
    display_name: "Demos",
    path: "public/images/music_page/album_page/demos",
    downloadable_artwork: "",
    songs: []
};

const albums = [the_depths, demos];

export async function getAlbums() {
    return albums;
};

export async function getAlbumByID(id) {
    for(let i = 0; i < albums.length; i++){
        if(albums[i].id == id){
            return albums[i];
        }
    }
    return null;
};

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
        source_tags += `<source src=${"\"..\\" + album.path + '/audio/' + album_songs[i].audio_file_name + "\""} type="audio/wav" data-track-number=${"\"" + album_songs[i].track_number + "\""}/>`;
        div_tags += `<div className=\"play-list-row\" data-track-row=${"\"" + album_songs[i].track_number + "\""}><div className=\"small-toggle-btn\"><i className=\"small-play-btn\"><span className=\"screen-reader-text\">Small toggle button</span></i></div><div className=\"track-number\">${album_songs[i].track_number}.</div><div className=\"track-title\"><a className=\"playlist-track\" href=\"#\" data-play-track=${"\"" + album_songs[i].track_number + "\""} style=\"pointer-events: none\">${album_songs[i].name}</a></div></div>`;
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