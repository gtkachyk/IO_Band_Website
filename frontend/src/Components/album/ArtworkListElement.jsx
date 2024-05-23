function ArtworkListElement({path}) {
    return (
        <li>
            <a className="art-list-download-link" href={`${path}`} download>
                <div className="art-list-element-hover-div" style={{ backgroundImage: `url('${path}')` }}>
                    <span className="art-list-caption">Download</span>
                </div>
            </a>
        </li>
    );
}

export default ArtworkListElement;