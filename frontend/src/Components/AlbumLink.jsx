import '../styles/components/album_link.scss';

function AlbumLink({ title, image, link, id }) {
  return (
    <a href={link}>
      <div className="link-div" id={id} style={{ backgroundImage: `url('${image}')` }}>
        <span className="link-caption">{title}</span>
      </div>
    </a>
  );
}

export default AlbumLink;
