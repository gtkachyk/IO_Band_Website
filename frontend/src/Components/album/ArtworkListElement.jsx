function ArtworkListElement({paths}){
    return(
        <li>
            <a className="art-list-download-link" href={`${'../' + paths[0]}`} download>
                <div className="art-list-element-hover-div" style={{ backgroundImage: `url('${'../' + paths[1]}')` }}>
                    <span className="art-list-caption">Download</span>
                </div>
            </a>
        </li>
    );
}

export default ArtworkListElement;