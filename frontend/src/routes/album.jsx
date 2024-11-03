import NavBar from "../Components/NavBar";
import {useLoaderData} from "react-router-dom";
import AlbumPlayer from "../Components/album/AlbumPlayer";
import ArtworkList from "../Components/album/ArtworkList";
import LyricSheetList from "../Components/album/LyricSheetList";
import TabList from "../Components/album/TabList";
import React, { useEffect, useState } from 'react';
import {generatePlaylistHTML} from "../js/albums";
import '../styles/album/album.scss';
import { fetchData } from '../js/api';
import { constants } from '../assets/constants.js';
import ContentUnit from "../Components/ContentUnit.jsx";
import MainContainer from "../Components/MainContainer.jsx";

export async function loader({params}) {
  return params.name;
}

// TODO: add release date in bottom left of page
function Album () {
  // Get album name
  const album_name = useLoaderData();
  if(album_name == undefined){
    return <>Loading...</>
  }

  // State variables
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [styles, setStyles] = useState(null);
  
  const styleSheet = `../styles/album/${album_name}.scss`;
  useEffect(() => {
    // Dynamically import the provided stylesheet
    const importStyles = async () => {
      try {
        const res = await import(`${styleSheet}`);
        setStyles(res);
      } catch (error) {
        // Fallback to the default stylesheet if import fails
        console.error("Error importing stylesheet in album.jsx: " + error);
        const defaultStyles = await import('../styles/album/default.scss');
        setStyles(defaultStyles);
      }
    };

    importStyles();
  }, [styleSheet]);

  // Get album and all songs belonging to album
  useEffect(() => {
    fetchData(['albums/' + album_name, 'songs/' + `?album=${encodeURIComponent(album_name)}`], setData, setLoading);
  }, []);

  // Add playlist.js when loading is done
  useEffect(() => {
    if (!loading) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '/js/playlist.js';
      script.async = true;
      document.body.appendChild(script);
        
      return () => {
          document.body.removeChild(script);
      };
    }
  }, [loading]);

  if (loading) {
    return (<>Loading...</>);
  }

  // Divide data
  const album = data[0];
  const songs = data[1];

  // Generate tags
  const html_tags = generatePlaylistHTML(album, songs);
  const source_tags = html_tags[0];
  const div_tags = html_tags[1];

  // Calculate the height of the page container and vertical divider based on the size of the song list and artwork list (an alternative to writing good code)
  // var mainContainerHeight = 730;
  // mainContainerHeight = Math.max(730, mainContainerHeight + ((songs.length - 14) * 35), mainContainerHeight + ((album.downloadable_artwork.split(',').length - 4) * 120))
  // var verticalDividerHeight = mainContainerHeight - 200;

  const contentUnits = [
    // Album page example
    {
      title: 'Album Page',
      columns: [
        { header: 'Tracks', content: <AlbumPlayer source_tags={source_tags} div_tags={div_tags}></AlbumPlayer>, width: '40%' },
        { header: 'Artwork', content: 'This is the content for column 2', width: '20%'},
        { header: 'Lyric Sheets', content: 'This is the content for column 3', width: '20%' },
        { header: 'Tabs', content: 'This is the content for column 4', width: '20%' },
      ],
    },
  ];

  return (
    <>
      <NavBar></NavBar>
      <MainContainer styleSheet={`../styles/album/content_unit.scss`}>
        <ContentUnit title={contentUnits[0].title} columns={contentUnits[0].columns}></ContentUnit> 
      </MainContainer>
    </>
      // <>
      //     <div className="album-div-main" style={{height:mainContainerHeight + 'px'}}>
      //         <NavBar></NavBar>
      //         <div className="album-page-content">
      //             <div className="album-page-title-div" id={"album-page-title-div-" + album.id}>
      //                 <h2 className = "album-page-title-header">{album.display_name}</h2>
      //                 <hr className="horizontal-separator"/>
      //             </div>
      //             <div className="album-page-content-table-container">
      //                 <table className="album-page-content-table">
      //                     <tbody>
      //                         <tr>
      //                             <th className="album-player-column" style={{height:verticalDividerHeight}}>
      //                                 <h2 className="album-player-header">Tracks</h2>
      //                                 <div className="album-player-div">
      //                                     <AlbumPlayer source_tags={source_tags} div_tags={div_tags}></AlbumPlayer>
      //                                 </div>
      //                             </th>
      //                             <td className="vertical-divider"></td>
      //                             <th className="art-column">
      //                                 <h2 className="artwork-header">Artwork</h2>
      //                                 <div className="artwork-div">
      //                                     <ArtworkList art_path={constants.routesPathToPublic + 'images/albums/' + album_name + '/downloadable/'} downloadable_artwork={album.downloadable_artwork}></ArtworkList>
      //                                 </div>
      //                             </th>
      //                             <th className="lyrics-column">
      //                                 <h2 className="lyric-sheet-header">Lyric Sheets</h2>
      //                                 <div className="lyric-sheet-div">
      //                                     <LyricSheetList album_songs={songs} lyric_sheets_path={constants.routesPathToPublic + 'lyric_sheets/' + album_name + '/'}></LyricSheetList>
      //                                 </div>
      //                             </th>
      //                             <th className="tabs-column">
      //                                 <h2 className="tab-header">Tabs</h2>
      //                                 <div className="tab-div">
      //                                     <TabList album_songs={songs} tabs_path={constants.routesPathToPublic + 'tabs/' + album_name + '/'}></TabList>
      //                                 </div>
      //                             </th>
      //                         </tr>
      //                     </tbody>
      //                 </table>
      //             </div>
      //         </div>
      //     </div>
      // </>
  );
}

export default Album;
