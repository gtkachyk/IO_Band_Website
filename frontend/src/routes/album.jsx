import NavBar from "../Components/NavBar";
import {useLoaderData} from "react-router-dom";
import AlbumPlayer from "../Components/AlbumPlayer";
import ArtworkList from "../Components/ArtworkList";
import LyricSheetList from "../Components/LyricSheetList";
import TabList from "../Components/TabList";
import React, { useEffect } from 'react';
import {getAlbumByName, generatePlaylistHTML, generateDownloadableArtPreviewPairs} from "../albums";

export async function loader({params}) {
  const album = await getAlbumByName(params.name);
  return {album};
}

function Album(){
  // Get album object
  const {album} = useLoaderData();
  if(album == undefined){
    return <>Loading...</>
  }
  const page_resource_path = "../" + album.path;

  // Set background
  useEffect(() => { document.body.style.backgroundImage = `url('${page_resource_path + "/images/page_background_album_" + album.id + ".jpg"}')`}, []);

  // Get data for sub components
  const artwork_preview_pairs = generateDownloadableArtPreviewPairs(album);
  const tags = generatePlaylistHTML(album);
  const source_tags = tags[0];
  const div_tags = tags[1];
  return(
      <>
          <NavBar></NavBar>
          <div className={"album-div-main"}>
              <div className="album-page-content">
                  <h1 className={"album-header-main"} id={"album-header-main-" + album.id}>{album.display_name}</h1>
                  <div className="album-player-div">
                      <h2 className="album-player-header">Tracks</h2>
                      <AlbumPlayer album={album} source_tags={source_tags} div_tags={div_tags}></AlbumPlayer>
                  </div>
                  <div className="artwork-div">
                      <h2 className="artwork-header">Artwork</h2>
                      <ArtworkList downloadable_artwork={artwork_preview_pairs}></ArtworkList>
                  </div>
                  <div className="lyric-sheet-div">
                      <h2 className="lyric-sheet-header">Lyric Sheets</h2>
                      <LyricSheetList album_songs={album.songs} lyric_sheets_path={album.path + '/lyric_sheets/'}></LyricSheetList>
                  </div>
                  <div className="tab-div">
                      <h2 className="tab-header">Tabs</h2>
                      <TabList album_songs={album.songs} tabs_path={page_resource_path + '/tabs/'}></TabList>
                  </div>
              </div>
          </div>
      </>
  );
}

export default Album;
