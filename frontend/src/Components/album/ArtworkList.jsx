import ArtworkListElement from "./ArtworkListElement";
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

function ArtworkList({art_path, downloadable_artwork}) {
    if (downloadable_artwork.length == 0) {
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
        <div className="artwork">
            <ul className="art-list">
                {parse(html)}
            </ul>
        </div>
    );
}

export default ArtworkList;