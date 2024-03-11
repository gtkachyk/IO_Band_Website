import NavBar from "../Components/NavBar";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';

function Music(){
    // Set page background
    const page_resource_path = "./public/images/music_page/";
    useEffect(() => { document.body.style.backgroundImage = `url('${page_resource_path + "images/page_background_music.jpg"}')`}, []);

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
        fetchData(['albums/']);
    }, []);
    
    if (loading) {
        return (<>Loading...</>);
    }
    const albums = data[0];

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
                                    <Link reloadDocument to={`${album.name}`}>
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