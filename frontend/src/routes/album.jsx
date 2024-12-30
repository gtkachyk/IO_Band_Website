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
import '../styles/routes/album/overwrite/content_unit.scss';

export async function loader ({ params }) {
  return params.name;
}

// TODO: add release date
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

  // All known stylesheets
  const all_styles = {
    into_the_grave: () => import(`../styles/routes/album/into_the_grave/local.scss`),
    II_0_II_III: () => import(`../styles/routes/album/II_0_II_III/local.scss`),
  };

  // Import the album's stylesheet
  useEffect(() => {
    const importStyles = async () => {
      try {
        // Check if the album_name exists in the styles object
        if (album_name in all_styles) {
          const res = await all_styles[album_name]();
          setStyles(res);
        } else {
          // Fallback to the default stylesheet if the key is missing
          console.warn(`Unknown album_name: "${album_name}", loading default styles.`);
          const defaultStyles = await import('../styles/routes/album/local.scss');
          setStyles(defaultStyles);
        }
      } catch (error) {
        console.error('Error importing stylesheet in Album component:', error);
      }
    };

    importStyles();
  }, [album_name]); // Run effect when album_name changes

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
      <MainContainer id={'album-container'}>
        <ContentUnit title={contentUnits[0].title} columns={contentUnits[0].columns}></ContentUnit>
      </MainContainer>
    </>
  );
}

export default Album;
