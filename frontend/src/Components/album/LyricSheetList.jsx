import LyricSheetListElement from './LyricSheetListElement';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';
import React from 'react';

function LyricSheetList({album_songs, lyric_sheets_path}){
    // FIlter out songs with blank lyric_sheet_file_name and songs that don't belong to 'album'.
    var songs_filtered = [];
    for(var i = 0; i < album_songs.length; i++){
      if(album_songs[i].lyric_sheet_file_name != ''){
        songs_filtered.push(album_songs[i]);
      }
    }

    if(songs_filtered.length == 0){
        return(
            <h3 className="lyrics-na"> N/A </h3>
        );
    }
    var list = "";
    for(let i = 0; i < songs_filtered.length; i++){
        var element = <LyricSheetListElement path={lyric_sheets_path + songs_filtered[i].lyric_sheet_file_name}></LyricSheetListElement>;
        list += ReactDOMServer.renderToString(element);
    }

    return(
        <div className="lyric-list-container">
            <ul className="lyric-list">
                {parse(list)}
            </ul>
        </div>
    );
}

export default LyricSheetList;