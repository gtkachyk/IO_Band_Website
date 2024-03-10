import NavBar from "../Components/NavBar";
import { Link, useLoaderData } from "react-router-dom";
import { getAlbums } from "../albums";
import React, { useEffect } from 'react';

export async function loader() {
  const albums = await getAlbums();
  return { albums };
}

function Music(){
    // Set page background
    const page_resource_path = "./public/images/music_page/";
    useEffect(() => { document.body.style.backgroundImage = `url('${page_resource_path + "images/page_background_music.jpg"}')`}, []);

    const {albums} = useLoaderData();
    return(
        <>
            <NavBar></NavBar>
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