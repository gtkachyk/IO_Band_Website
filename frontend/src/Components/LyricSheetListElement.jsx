function LyricSheetListElement({path}){
    var filename = path.replace(/^.*[\\/]/, '');
    return(
        <li>
            <a href={`${path}`} download>{filename}</a>
        </li>
    );
}

export default LyricSheetListElement;