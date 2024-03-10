import NavBar from "../Components/NavBar";
import { Link, useLoaderData } from "react-router-dom";
import { getAlbums } from "../albums";
import React, { useState, useEffect } from 'react';
import bg from '/src/images/IO Map (Custom).jpg';

export async function loader() {
  const albums = await getAlbums();
  return { albums };
}

function Music(){
    useEffect(() => { document.body.style.backgroundImage = `url('${bg}')`}, []);

    // Get albums from db.
    // const [data, setData] = useState([])
    // useEffect(() => {
    //   async function fetchData() {
    //     try{
    //       const response = await fetch(`${import.meta.env.VITE_API_URL}albums`);
    //       if (!response.ok){
    //         throw new Error('Network response was not ok');
    //       }
    //       const result = await response.json();
    //       setData(result);
    //     } catch (error){
    //       console.error('Error fetching data:', error);
    //     }
    //   }
  
    //   fetchData();
    // }, [])
    // const albums = JSON.parse(JSON.stringify(data));

    const {albums} = useLoaderData();

    console.log(albums)

    return(
        <>
            <NavBar></NavBar>
            {/* <AlbumLinks></AlbumLinks> */}
            <div id="album-links">
                <h1>Albums</h1> {/*This header is invisible and only exists to push the album links down past the nav bar.*/}
                <nav>
                    {albums.length ? (
                        <ul>
                            {albums.map((album) => (
                                <li key={album.id}>
                                    <Link reloadDocument to={`${album.name}`}> {/* album.id gets passed to album.jsx.loader as params.albumID */}
                                        <img src = {'../' + album.path + '/images/album_preview_artwork_' + album.id + '.jpg'}></img>{album.display_name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No albums</i>
                        </p>
                    )}
                </nav>
            </div>
        </>
    );
}

export default Music;