import NavBar from '../Components/NavBar';
import { useLoaderData } from 'react-router-dom';
import AlbumPlayer from '../Components/album/AlbumPlayer';
import ArtworkList from '../Components/album/ArtworkList';
import FileList from '../Components/album/FileList';
import React, { useEffect, useState } from 'react';
import { generatePlaylistHTML, getFiles } from '../js/albums';
import { fetchData } from '../js/api';
import { constants } from '../assets/constants.js';
import ContentUnit from '../Components/ContentUnit.jsx';
import MainContainer from '../Components/MainContainer.jsx';

export async function loader ({ params }) {
  return params.name;
}

// TODO: add release date in bottom left of page
function Album () {
  // Get album name
  const album_name = useLoaderData();
  if (album_name == undefined) {
    return <>Loading...</>;
  }

  // State variables
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [styles, setStyles] = useState(null);

  // Dynamically import the album's stylesheet
  const styleSheet = `../styles/routes/album/${album_name}/local.scss`;
  useEffect(() => {
    const importStyles = async () => {
      try {
        const res = await import(`${styleSheet}`);
        setStyles(res);
      } catch (error) {
        // Fallback to the default stylesheet if import fails
        console.error('Error importing stylesheet in album.jsx: ' + error);
        const defaultStyles = await import('../styles/routes/album/local.scss');
        setStyles(defaultStyles);
      }
    };

    importStyles();
  }, [styleSheet]);

  // Get album and all songs belonging to album
  useEffect(() => {
    fetchData(['albums/' + album_name, 'songs/' + `?album=${encodeURIComponent(album_name)}`], setData, setLoading);
  }, []);

  // Add playlist.js when loading is done
  useEffect(() => {
    if (!loading) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '/js/playlist.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [loading]);

  if (loading) {
    return <>Loading...</>;
  }

  // Organize api data
  const album = data[0];
  const songs = data[1];

  // Generate tags
  const html_tags = generatePlaylistHTML(album, songs);
  const source_tags = html_tags[0];
  const div_tags = html_tags[1];
  const files = getFiles(songs);
  const lyrics = files[0];
  const tabs = files[1];

  const contentUnits = [
    {
      title: album.display_name,
      columns: [
        { header: 'Tra&shy;c&shy;k&shy;s', content: <AlbumPlayer source_tags={source_tags} div_tags={div_tags}></AlbumPlayer>, id: 'column-1' },
        { header: 'Art&shy;w&shy;o&shy;r&shy;k', content: <ArtworkList art_path={constants.routesPathToPublic + 'images/albums/' + album_name + '/downloadable/'} downloadable_artwork={album.downloadable_artwork}></ArtworkList>, id: 'column-2' },
        { header: 'Lyr&shy;i&shy;c&shy;s', content: <FileList path={constants.routesPathToPublic + 'lyric_sheets/' + album_name + '/'} files={lyrics}></FileList>, id: 'column-3' },
        { header: 'Tabs', content: <FileList path={constants.routesPathToPublic + 'tabs/' + album_name + '/'} files={tabs}></FileList>, id: 'column-4' },
      ],
    },
  ];

  return (
    <>
      <NavBar></NavBar>
      <MainContainer styleSheet={`../styles/routes/album/overwrite/content_unit.scss`}>
        <ContentUnit title={contentUnits[0].title} columns={contentUnits[0].columns}></ContentUnit>
      </MainContainer>
    </>
  );
}

export default Album;
