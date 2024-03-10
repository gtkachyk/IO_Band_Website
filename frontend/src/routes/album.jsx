import NavBar from "../Components/NavBar";
import {useLoaderData} from "react-router-dom";
import AlbumPlayer from "../Components/AlbumPlayer";
import ArtworkList from "../Components/ArtworkList";
import LyricSheetList from "../Components/LyricSheetList";
import TabList from "../Components/TabList";
import React, { useEffect } from 'react';
import axios from 'axios';

// TODO: make this not the worst code of all time
export async function loader({params}) {
    var album = undefined
    var songs = undefined
    try {
      album = await axios.get(`${import.meta.env.VITE_API_URL}albums/${params.id}`);
    } 
    catch (error) {
      console.error('Error fetching album data in album.jsx.loader():', error);
      return { album: null, songs: null};
    }

    try{
      songs = await axios.get(`${import.meta.env.VITE_API_URL}songs`);
      return {album, songs};
    } 
    catch (error){
      console.error('Error fetching data:', error);
      return { album: null, songs: null};
    }
}

function Album(){
    const {album, songs} = useLoaderData();
    if(album == undefined || songs == undefined){
      return <>Loading...</>
    }

    useEffect(() => {
      const script = document.createElement("script");
      script.src = "..\\src\\playlist.js";
      document.body.appendChild(script);
      return () => {
          document.body.removeChild(script);
      }
    }, []);

    // useEffect(() => { document.body.style.backgroundImage = `url('${album.pageBackground}')`}, []);

    // Filter out songs that don't belong to 'album'.
    var album_songs = [];
    var source_tags = ``;
    var div_tags = ``;
    for(var i = 0; i < songs.data.length; i++){
      if(songs.data[i].album == album.data.id){
        album_songs.push(songs.data[i]);
        source_tags += `<source src=${"\"..\\" + album.data.path + '/audio/' + songs.data[i].audio_file_name + "\""} type="audio/wav" data-track-number=${"\"" + songs.data[i].track_number + "\""}/>`;
        div_tags += songs.data[i].album_player_html;
      }
    }

    // Create list of downloadable artwork file names for 'album'.
    const downloadable_artwork = album.data.downloadable_artwork.split(',');
    var artwork_preview_pairs = [];
    const downloadable_artwork_folder_path = album.data.path + '/images/downloadable/';
    for(var i = 0; i < downloadable_artwork.length; i++){
        const current_art = downloadable_artwork[i];
        const current_art_split = current_art.split('.');
        const current_art_file_extension = current_art_split[current_art_split.length - 1];
        artwork_preview_pairs.push([downloadable_artwork_folder_path + current_art, downloadable_artwork_folder_path + current_art.substring(0, current_art.lastIndexOf('.')) + '_preview.' + current_art_file_extension]);
    }

    return(
        <>
            <NavBar></NavBar>
            <div className={"album-div-main"}>
                <div className="album-page-content">
                    <h1 className={"album-header-main"} id={"album-header-main-" + album.id}>{album.name}</h1>
                    <div className="album-player-div">
                        <h2 className="album-player-header">Tracks</h2>
                        <AlbumPlayer album={album.data} source_tags={source_tags} div_tags={div_tags} audio_path={album.data.path + '/audio/'}></AlbumPlayer>
                    </div>
                    <div className="artwork-div">
                        <h2 className="artwork-header">Artwork</h2>
                        <ArtworkList downloadable_artwork={artwork_preview_pairs}></ArtworkList>
                    </div>
                    <div className="lyric-sheet-div">
                        <h2 className="lyric-sheet-header">Lyric Sheets</h2>
                        <LyricSheetList album_songs={album_songs} lyric_sheets_path={album.data.path + '/lyric_sheets/'}></LyricSheetList>
                    </div>
                    <div className="tab-div">
                        <h2 className="tab-header">Tabs</h2>
                        <TabList album_songs={album_songs} tabs_path={album.data.path + '/tabs/'}></TabList>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Album;
