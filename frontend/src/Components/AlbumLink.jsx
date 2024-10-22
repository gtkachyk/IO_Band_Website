import '../styles/album_link.scss';

function AlbumLink({title, image, link, styleSheet}) {
  // Import scss for this album link
  let styles;
  import(`${styleSheet}`).then((res) => {styles = res;}).catch((error) => {import(`../styles/album_link_default.scss`).then((res) => {styles = res;})});

  return (
    <a href={link}>
      <div className="link-div" style={{backgroundImage: `url('${image}')`}}>
          <span className="link-caption">{title}</span>
      </div>
    </a>
  );
}

export default AlbumLink;