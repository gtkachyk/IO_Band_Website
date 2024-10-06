function NavBar(){
    return (
        <>
            <div className="nav-bar-full-screen-container">
                <div className="nav-bar-container">
                    <div className="navbar">
                        <nav>
                            <ul>
                                <li>
                                    <a href={`/`}>Home</a>
                                </li>
                                <li>
                                    <a href={`/music`}>Music</a>
                                </li>
                                <li>
                                    <a href={`/video`}>Video</a>
                                </li>
                                <li>
                                    <a href={`/about`}>About</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NavBar;