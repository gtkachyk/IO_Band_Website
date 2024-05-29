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
            script.src = 'src/js/playlist.js';
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
    document.body.style.backgroundImage = `url('${'/images/albums/' + album.name + '/background.jpg'}')`;

    // Generate tags
    const html_tags = generatePlaylistHTML(album, songs);
    const source_tags = html_tags[0];
    const div_tags = html_tags[1];

    return (
        <>
            <NavBar></NavBar>
            <div className={"album-div-main"}>
                <div className="album-page-content">
                    <div className="album-page-title-div" id={"album-page-title-div-" + album.id}>
                        <h2 className = "album-page-title-header">{album.display_name}</h2>
                        <hr className="horizontal-separator"/>
                    </div>
                    <div className="album-page-content-table-container">
                        <table className="album-page-content-table">
                            <tbody>
                                <tr>
                                    <th className="album-player-column">
                                        <h2 className="album-player-header">Tracks</h2>
                                        <div className="album-player-div">
                                            <AlbumPlayer source_tags={source_tags} div_tags={div_tags}></AlbumPlayer>
                                        </div>
                                    </th>
                                    <td className="vertical-divider"></td>
                                    <th className="art-column">
                                        <h2 className="artwork-header">Artwork</h2>
                                        <div className="artwork-div">
                                            <ArtworkList art_path={'/images/albums/' + album_name + '/downloadable/'} downloadable_artwork={album.downloadable_artwork}></ArtworkList>
                                        </div>
                                    </th>
                                    <th className="lyrics-column">
                                        <h2 className="lyric-sheet-header">Lyric Sheets</h2>
                                        <div className="lyric-sheet-div">
                                            <LyricSheetList album_songs={songs} lyric_sheets_path={'/lyric_sheets/' + album_name + '/'}></LyricSheetList>
                                        </div>
                                    </th>
                                    <th className="tabs-column">
                                        <h2 className="tab-header">Tabs</h2>
                                        <div className="tab-div">
                                            <TabList album_songs={songs} tabs_path={'/tabs/' + album_name + '/'}></TabList>
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
