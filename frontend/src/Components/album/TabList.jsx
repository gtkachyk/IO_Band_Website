import TabListElement from './TabListElement';
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';
import React from 'react';

function TabList({album_songs, tabs_path}) {
    // Filter out songs with blank tab_file_names and songs that don't belong to 'album'.
    var songs_filtered = [];
    for (var i = 0; i < album_songs.length; i++) {
        if (album_songs[i].tab_file_name != '') {
          songs_filtered.push(album_songs[i]);
        }
    }

    if (songs_filtered.length == 0) {
        return (
            <h3 className="tabs-na"> N/A </h3>
        );
    }
    var list = "";
    for (let i = 0; i < songs_filtered.length; i++) {
        var element = <TabListElement path={tabs_path + songs_filtered[i].tab_file_name}></TabListElement>;
        list += ReactDOMServer.renderToString(element);
    }
    return (
        <div className="tab-list-container">
            <ul className="tab-list">
                {parse(list)}
            </ul>
        </div>
    );
}

export default TabList;