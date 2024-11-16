import '../styles/navbar.scss';

function NavBar() {
  return (
    <header className="nav-bar-container">
      <nav className="navbar">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/music">Music</a>
          </li>
          <li>
            <a href="/video">Video</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
