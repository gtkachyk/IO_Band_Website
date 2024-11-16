/**
 * FileList Component
 *
 * A container for displaying file download links.
 *
 * Props:
 * - `path` (string): Required. The path to a directory containing downloadable files
 * - `files` (array of strings): Required. A list of files to display
 *
 * Styling:
 * - This component is styled via the `styles/album/file_list.scss` stylesheet
 */

import ReactDOMServer from 'react-dom/server';
import parse from 'html-react-parser';
import React from 'react';
import '../../styles/album/file_list.scss';

function FileList({ path, files }) {
  if (files.length == 0) {
    return <h3 className="files-na"> N/A </h3>;
  }

  var list = '';
  for (let i = 0; i < files.length; i++) {
    var display_path = path + '/' + files[i];
    var filename = display_path.replace(/^.*[\\/]/, '');
    if (filename.length > 20) {
      filename = filename.slice(0, 20) + '...';
    }
    var element = (
      <li>
        <a href={`${path + '/' + files[i]}`} download>
          {filename}
        </a>
      </li>
    );
    list += ReactDOMServer.renderToString(element);
  }

  return <ul className="file-list">{parse(list)}</ul>;
}

export default FileList;
