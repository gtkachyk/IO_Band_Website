function NavBar(){
  return (
    <>
      <div id="navbar">
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
    </>
  );
}

export default NavBar;