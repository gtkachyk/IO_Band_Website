import NavBar from "../Components/NavBar";
import {useLoaderData} from "react-router-dom";
import {getAlbum} from "../albums";
import AlbumPlayer from "../Components/AlbumPlayer";
import ArtworkList from "../Components/ArtworkList";
import LyricSheetList from "../Components/LyricSheetList";
import TabList from "../Components/TabList";
import React, { useState, useEffect } from 'react';

export async function loader({params}) {
    // Use same technique to get all tabs/lyric sheets/songs for an album.
    // Get album from db.
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}albums/${params.albumId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const album = await response.json();
      return { album };
    } 
    catch (error) {
      console.error('Error fetching album data in album.jsx.loader():', error);
      return { album: null };
    }
}

function Album(){
    useEffect(() => { document.body.style.backgroundImage = `url('${album.pageBackground}')`}, []);
    const {album} = useLoaderData();

    // Get songs from db.
    const [data, setData] = useState([])
    useEffect(() => {
      async function fetchData() {
        try{
          const response = await fetch(`${import.meta.env.VITE_API_URL}songs`);
          if (!response.ok){
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          setData(result);
        } catch (error){
          console.error('Error fetching data:', error);
        }
      }
    
      fetchData();
    }, [])
    var songs = JSON.parse(JSON.stringify(data));

    // Filter out songs that don't belong to 'album'.
    var album_songs = [];
    for(var i = 0; i < songs.length; i++){
      if(songs[i].album == album.id){
        album_songs.push(songs[i]);
      }
    }

    // Create list of downloadable artwork file names for 'album'.
    const downloadable_artwork = album.downloadable_artwork.split(',');
    var artwork_preview_pairs = [];
    const downloadable_artwork_folder_path = album.path + '/images/downloadable/';
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
                    {/* <div className="album-player-div">
                        <h2 className="album-player-header">Tracks</h2>
                        <AlbumPlayer album={album}></AlbumPlayer>
                    </div> */}
                    <div className="artwork-div">
                        <h2 className="artwork-header">Artwork</h2>
                        <ArtworkList downloadable_artwork={artwork_preview_pairs}></ArtworkList>
                    </div>
                    <div className="lyric-sheet-div">
                        <h2 className="lyric-sheet-header">Lyric Sheets</h2>
                        <LyricSheetList album_songs={album_songs} lyric_sheets_path={album.path + '/lyric_sheets/'}></LyricSheetList>
                    </div>
                    <div className="tab-div">
                        <h2 className="tab-header">Tabs</h2>
                        <TabList album_songs={album_songs} tabs_path={album.path + '/tabs/'}></TabList>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Album;