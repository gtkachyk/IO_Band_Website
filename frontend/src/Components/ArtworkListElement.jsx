function ArtworkListElement({paths}){
    return(
        <li>
            <a href={`${'../' + paths[0]}`} download>
                <img className="art-list-element" src={`${'../' + paths[1]}`}></img>
            </a>
        </li>
    );
}

export default ArtworkListElement;