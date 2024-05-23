import NavBar from "../Components/NavBar";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import '../styles/music.scss';
import { fetchData } from '../js/api';
import { music } from '../assets/music.js';

function Music() {
    // Set page background
    useEffect(() => { document.body.style.backgroundImage = `url('${music.background_image}')`}, []);

    // State variables
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get data from database
    useEffect(() => {
        fetchData(['albums/'], setData, setLoading);
    }, []);
    
    if (loading) {
        return (<>Loading...</>);
    }
    const albums = data[0];

    return (
        <>
            <NavBar></NavBar>
            <div id="album-links">
                <h1>Albums</h1> {/*This header is invisible and only exists to push the album links down past the nav bar.*/}
                <nav>
                    {albums.length ? (
                        <ul>
                            {albums.map((album) => (
                                <li key={album.name}>
                                    <Link reloadDocument to={`${album.name}`}>
                                        <img src = {'../public/images/albums/' + album.name + '/music_link.jpg'}></img>
                                        <h2 className="album-link-h2">{album.display_name}</h2>
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