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

export async function loader({params}) {
    return params.name;
}

function Album() {
    // Get album name
    const album_name = useLoaderData();
    if(album_name == undefined){
      return <>Loading...</>
    }

    // State variables
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Import scss for this album
    let styles;
    const album_scss = `../styles/album/${album_name}.scss`;
    import(album_scss).then((res) => {styles = res;}).catch((error) => {import(`../styles/album/default.scss`).then((res) => {styles = res;})});

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

    // Set page background
    document.body.style.backgroundImage = `url('${constants.routesPathToPublic + 'images/albums/' + album.name + '/background.jpg'}')`;
    // document.body.style.backgroundImage = `linear-gradient(to bottom, rgba(230, 230, 230, 0.219) , rgba(0, 0, 0, 0.178))`;

    // Generate tags
    const html_tags = generatePlaylistHTML(album, songs);
    const source_tags = html_tags[0];
    const div_tags = html_tags[1];

    // Calculate the height of the page container and vertical divider based on the size of the song list and artwork list (an alternative to writing good code)
    var mainContainerHeight = 730;
    mainContainerHeight = Math.max(730, mainContainerHeight + ((songs.length - 14) * 35), mainContainerHeight + ((album.downloadable_artwork.split(',').length - 4) * 120))
    var verticalDividerHeight = mainContainerHeight - 200;

    return (
        <>
            <div className="album-div-main" style={{height:mainContainerHeight + 'px'}}>
                <NavBar></NavBar>
                <div className="album-page-content">
                    <div className="album-page-title-div" id={"album-page-title-div-" + album.id}>
                        <h2 className = "album-page-title-header">{album.display_name}</h2>
                        <hr className="horizontal-separator"/>
                    </div>
                    <div className="album-page-content-table-container">
                        <table className="album-page-content-table">
                            <tbody>
                                <tr>
                                    <th className="album-player-column" style={{height:verticalDividerHeight}}>
                                        <h2 className="album-player-header">Tracks</h2>
                                        <div className="album-player-div">
                                            <AlbumPlayer source_tags={source_tags} div_tags={div_tags}></AlbumPlayer>
                                        </div>
                                    </th>
                                    <td className="vertical-divider"></td>
                                    <th className="art-column">
                                        <h2 className="artwork-header">Artwork</h2>
                                        <div className="artwork-div">
                                            <ArtworkList art_path={constants.routesPathToPublic + 'images/albums/' + album_name + '/downloadable/'} downloadable_artwork={album.downloadable_artwork}></ArtworkList>
                                        </div>
                                    </th>
                                    <th className="lyrics-column">
                                        <h2 className="lyric-sheet-header">Lyric Sheets</h2>
                                        <div className="lyric-sheet-div">
                                            <LyricSheetList album_songs={songs} lyric_sheets_path={constants.routesPathToPublic + 'lyric_sheets/' + album_name + '/'}></LyricSheetList>
                                        </div>
                                    </th>
                                    <th className="tabs-column">
                                        <h2 className="tab-header">Tabs</h2>
                                        <div className="tab-div">
                                            <TabList album_songs={songs} tabs_path={constants.routesPathToPublic + 'tabs/' + album_name + '/'}></TabList>
                                        </div>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Album;
