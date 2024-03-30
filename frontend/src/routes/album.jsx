import NavBar from "../Components/NavBar";
import {useLoaderData} from "react-router-dom";
import AlbumPlayer from "../Components/AlbumPlayer";
import ArtworkList from "../Components/ArtworkList";
import LyricSheetList from "../Components/LyricSheetList";
import TabList from "../Components/TabList";
import React, { useEffect, useState } from 'react';
import {getAlbumByName, generatePlaylistHTML, generateDownloadableArtPreviewPairs, getAlbumSongs} from "../albums";
import '../styles/album.scss';

export async function loader({params}) {
    const loader_album = await getAlbumByName(params.name);
    return {loader_album};
}

function Album() {
    // Get album object
    const {loader_album} = useLoaderData();
    if(loader_album == undefined){
      return <>Loading...</>
    }

    // Import scss for this album
    let styles;
    const album_scss = `../styles/albums/${loader_album.name}.scss`;
    import(album_scss).then((res) => {styles = res;}).catch((error) => {import(`../styles/albums/default.scss`).then((res) => {styles = res;})});

    // Data for api interaction
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchData = async (endpoints) => {
        try {
            const responses = await Promise.all(
                endpoints.map(async (endpoint) => {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`);
                    if (!response.ok) {
                        throw new Error(`Network response was not ok for endpoint: ${endpoint}`);
                    }
                    return response.json();
                })
            );

            setData(responses);
            setLoading(false); // Set loading to false once all data is fetched
        } catch (error) {
            console.error('Error fetching data: ', error);
            setLoading(false); // Set loading to false in case of an error
        }
    };

    // Get data from database
    useEffect(() => {
        fetchData(['albums/' + loader_album.id, 'songs/']);
    }, []);

    // Add playlist.js when loading is done
    useEffect(() => {
        if (!loading) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = '/src/playlist.js';
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
    const page_resource_path = "../" + album.path;

    // Set page background
    document.body.style.backgroundImage = `url('${page_resource_path + "/images/page_background_album_" + album.id + ".jpg"}')`;

    // Filter out songs that do not belong to album
    const album_songs = getAlbumSongs(songs, album);

    // Generate tags
    const html_tags = generatePlaylistHTML(album, album_songs);
    const source_tags = html_tags[0];
    const div_tags = html_tags[1];

    // Create artwork pairs
    const artwork_preview_pairs = generateDownloadableArtPreviewPairs(album.downloadable_artwork, album.path);

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
                                            <AlbumPlayer album={album} source_tags={source_tags} div_tags={div_tags}></AlbumPlayer>
                                        </div>
                                    </th>
                                    <td className="vertical-divider"></td>
                                    <th className="art-column">
                                        <h2 className="artwork-header">Artwork</h2>
                                        <div className="artwork-div">
                                            <ArtworkList downloadable_artwork={artwork_preview_pairs}></ArtworkList>
                                        </div>
                                    </th>
                                    <th className="lyrics-column">
                                        <h2 className="lyric-sheet-header">Lyric Sheets</h2>
                                        <div className="lyric-sheet-div">
                                            <LyricSheetList album_songs={album_songs} lyric_sheets_path={page_resource_path + '/lyric_sheets/'}></LyricSheetList>
                                        </div>
                                    </th>
                                    <th className="tabs-column">
                                        <h2 className="tab-header">Tabs</h2>
                                        <div className="tab-div">
                                            <TabList album_songs={album_songs} tabs_path={page_resource_path + '/tabs/'}></TabList>
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
