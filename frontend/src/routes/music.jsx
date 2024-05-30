import NavBar from "../Components/NavBar";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import '../styles/music.scss';
import { fetchData } from '../js/api';
import { music } from '../assets/music.js';
import { constants } from '../assets/constants.js';
import parse from 'html-react-parser';

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

    // Needed to make the album links align vertically when there are an odd number of albums
    var invisibleElementHtml = ``;
    if (albums.length % 2 !== 0) {
        invisibleElementHtml = `
        <li class="invisible-element">
            <a href="#">
                <img src="${constants.routesPathToPublic}images/invisible_album_link_image_for_debugging_only.jpg" alt="Invisible Album" />
                <h2 class="album-link-h2">This should never be seen</h2>
            </a>
        </li>`;
    }

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
                                        <img src = {constants.routesPathToPublic + 'images/albums/' + album.name + '/music_link.jpg'}></img>
                                        <h2 className="album-link-h2">{album.display_name}</h2>
                                    </Link>
                                </li>
                            ))}
                            {parse(invisibleElementHtml)}
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