/**
 * ArtworkList Component
 *
 * A container for displaying artwork download links.
 * 
 * Props:
 * - `art_path` (string): Required. A path to an album's downloadable artwork
 * - `downloadable_artwork` (array of strings): Required. A list file names
 * 
 * Styling:
 * - This component is styled via the `styles/album/artwork.scss` stylesheet
 */

import ArtworkListElement from "./ArtworkListElement";
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';
import '../../styles/album/artwork.scss';

function ArtworkList ({art_path, downloadable_artwork}) {
  if (downloadable_artwork.length <= 2) {
    return(
      <h3 className="artwork-na"> N/A </h3>
    );
  }

  var downloadable_artwork_list = downloadable_artwork.split(',');
  for (var i = 0; i < downloadable_artwork_list.length; i++) {
    downloadable_artwork_list[i] = art_path + downloadable_artwork_list[i]
  }

  var html = "";
  for (let i = 0; i < downloadable_artwork_list.length; i++) {
    var element = <ArtworkListElement path={downloadable_artwork_list[i]}></ArtworkListElement>;
    html += ReactDOMServer.renderToString(element);
  }

  return (
    <ul className="art-list">
      {parse(html)}
    </ul>
  );
}

export default ArtworkList;