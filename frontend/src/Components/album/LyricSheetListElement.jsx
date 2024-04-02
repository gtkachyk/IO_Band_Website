function LyricSheetListElement({path}){
    var filename = path.replace(/^.*[\\/]/, '');
    if (filename.length > 20){
        filename = filename.slice(0, 20) + "...";
    }

    return(
        <li>
            <a href={`${path}`} download>{filename}</a>
        </li>
    );
}

export default LyricSheetListElement;