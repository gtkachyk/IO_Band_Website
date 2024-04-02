import ArtworkListElement from "./ArtworkListElement";
import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';

function ArtworkList({downloadable_artwork}){
    if(downloadable_artwork.length == 0){
        return(
            <h3 className="artwork-na"> N/A </h3>
        );
    }
    var list = "";
    for(let i = 0; i < downloadable_artwork.length; i++){
        var element = <ArtworkListElement paths={downloadable_artwork[i]}></ArtworkListElement>;
        list += ReactDOMServer.renderToString(element);
    }
    return(
        <div className="artwork">
            <ul className="art-list">
                {parse(list)}
            </ul>
        </div>
    );
}

export default ArtworkList;