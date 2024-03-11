import NavBar from "../Components/NavBar";
import {useLoaderData} from "react-router-dom";
import AlbumPlayer from "../Components/AlbumPlayer";
import ArtworkList from "../Components/ArtworkList";
import LyricSheetList from "../Components/LyricSheetList";
import TabList from "../Components/TabList";
import React, { useEffect, useState } from 'react';
import {getAlbumByName, generatePlaylistHTML, generateDownloadableArtPreviewPairs, getAlbumSongs} from "../albums";

export async function loader({params}) {
    console.log(params.name);
  const loader_album = await getAlbumByName(params.name);
  return {loader_album};
}

function Album(){
    // Get album object
    const {loader_album} = useLoaderData();
    if(loader_album == undefined){
      return <>Loading...</>
    }

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
                        <LyricSheetList album_songs={album_songs} lyric_sheets_path={album.path + '/lyric_sheets/'}></LyricSheetList>
                    </div>
                    <div className="tab-div">
                        <h2 className="tab-header">Tabs</h2>
                        <TabList album_songs={album_songs} tabs_path={page_resource_path + '/tabs/'}></TabList>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Album;





// Without using API:

// import NavBar from "../Components/NavBar";
// import {useLoaderData} from "react-router-dom";
// import AlbumPlayer from "../Components/AlbumPlayer";
// import ArtworkList from "../Components/ArtworkList";
// import LyricSheetList from "../Components/LyricSheetList";
// import TabList from "../Components/TabList";
// import React, { useEffect, useState } from 'react';
// import {getAlbumByName, generatePlaylistHTML, generateDownloadableArtPreviewPairs} from "../albums";

// export async function loader({params}) {
//   const album = await getAlbumByName(params.name);
//   return {album};
// }

// function Album(){
//     console.log("******************** Album component called ********************");

//     // Get album object
//     const {album} = useLoaderData();
//     const [data, setData] = useState([]); // for test api call 
//     const [loading, setLoading] = useState(true); // for test api call
//     if(album == undefined){
//       return <>Loading...</>
//     }
//     const page_resource_path = "../" + album.path;

//     // Set background
//     useEffect(() => { document.body.style.backgroundImage = `url('${page_resource_path + "/images/page_background_album_" + album.id + ".jpg"}')`}, []);

//     // Get data for sub components
//     const artwork_preview_pairs = generateDownloadableArtPreviewPairs(album);
//     const tags = generatePlaylistHTML(album);
//     const source_tags = tags[0];
//     const div_tags = tags[1];

//     // Test API call
//     const fetchData = async() => {
//         try{
//             const response = await fetch(`${import.meta.env.VITE_API_URL}songs/`);
//             if(!response.ok){
//                 throw new Error('Network response was not ok');
//             }
//             const result = await response.json();
//             setData(result);
//             setLoading(false);
//         }
//         catch (error){
//             console.error('Error fetching data: ', error);
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         fetchData();
//     }, []);

//     useEffect(() => {
//         // Run playlist.js after loading is false
//         if (!loading) {
//             const script = document.createElement('script');
//             script.type = 'text/javascript';
//             script.src = '/src/playlist.js';
//             script.async = true;
//             document.body.appendChild(script);

//             return () => {
//                 // Clean up the script when the component unmounts
//                 document.body.removeChild(script);
//             };
//         }
//     }, [loading]);

//     if (loading) {
//         return (<>Loading...</>);
//     }

//     console.log("done fetching, data = " + data);

//     var source_tags_test = ``;
//     var div_tags_test = ``;
//     const album_songs = data;
//     for(var i = 0; i < album_songs.length; i++){
//         source_tags_test += `<source src=${"\"..\\" + album.path + '/audio/' + album_songs[i].audio_file_name + "\""} type="audio/wav" data-track-number=${"\"" + album_songs[i].track_number + "\""}/>`;
//         div_tags_test += `<div className=\"play-list-row\" data-track-row=${"\"" + album_songs[i].track_number + "\""}><div className=\"small-toggle-btn\"><i className=\"small-play-btn\"><span className=\"screen-reader-text\">Small toggle button</span></i></div><div className=\"track-number\">${album_songs[i].track_number}.</div><div className=\"track-title\"><a className=\"playlist-track\" href=\"#\" data-play-track=${"\"" + album_songs[i].track_number + "\""} style=\"pointer-events: none\">${album_songs[i].name}</a></div></div>`;
//     }

//     return(
//         <>
//             <NavBar></NavBar>
//             <div className={"album-div-main"}>
//                 <div className="album-page-content">
//                     <h1 className={"album-header-main"} id={"album-header-main-" + album.id}>{album.display_name}</h1>
//                     <div className="album-player-div">
//                         <h2 className="album-player-header">Tracks</h2>
//                         <AlbumPlayer album={album} source_tags={source_tags_test} div_tags={div_tags_test}></AlbumPlayer>
//                     </div>
//                     <div className="artwork-div">
//                         <h2 className="artwork-header">Artwork</h2>
//                         <ArtworkList downloadable_artwork={artwork_preview_pairs}></ArtworkList>
//                     </div>
//                     <div className="lyric-sheet-div">
//                         <h2 className="lyric-sheet-header">Lyric Sheets</h2>
//                         <LyricSheetList album_songs={album.songs} lyric_sheets_path={album.path + '/lyric_sheets/'}></LyricSheetList>
//                     </div>
//                     <div className="tab-div">
//                         <h2 className="tab-header">Tabs</h2>
//                         <TabList album_songs={album.songs} tabs_path={page_resource_path + '/tabs/'}></TabList>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Album;
