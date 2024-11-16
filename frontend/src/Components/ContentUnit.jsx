/**
 * ContentUnit Component
 *
 * A container for organizing related pieces of content inside a MainContainer.
 * ContentUnits consist of an optional header and one or more content columns.
 *
 * Props:
 * - `title` (string): Optional. Text to be displayed in the header
 * - `columns` (array of objects): Required. A list of column information:
 *   - `header` (string): Required. Text to be displayed in the column header
 *   - `content` (HTML): Required. HTML to be rendered in the column
 *   - `width` (string): Optional. The width of the column as a percentage. If excluded, each column will have the same width
 *   - `min_width` (integer): Optional. The min-width of the column in px. If excluded, the min-width of the column must be defined in a stylesheet
 *
 * Styling:
 * - This component is primarily styled via the `styles/content_unit.scss` stylesheet
 * - The initial size and resizing behavior of the content columns may need to be adjusted to meet the needs of a specific page
 * - This can be done with an additional stylesheet or with the inline styles specified in the component
 * - The file `styles/content_unit_default.scss` is a template for additional stylesheets
 * - Inline styles will overwrite stylesheet styles
 */

import React, { useEffect } from 'react';

function ContentUnit({ title, columns }) {
  // Set the column header heights
  useEffect(() => {
    const setEqualHeights = () => {
      const headers = document.querySelectorAll('.content-container .column-header');
      let maxHeight = 0;

      headers.forEach((header) => {
        header.style.height = 'auto';
        const headerHeight = header.getBoundingClientRect().height;
        if (headerHeight > maxHeight) {
          maxHeight = headerHeight;
        }
      });

      headers.forEach((header) => {
        header.style.height = `${maxHeight}px`;
      });
    };

    setEqualHeights();
    window.addEventListener('resize', setEqualHeights);

    return () => {
      window.removeEventListener('resize', setEqualHeights);
    };
  }, [columns]);

  return (
    <div className="unit">
      {title && <h2 className="unit-title">{title}</h2>}
      <div className="content-container">
        {columns.map((column, index) => {
          return (
            <div key={index} className="content-column" id={column.id}>
              {column.header && <h3 className="column-header">{column.header}</h3>}
              <div className="column-content">{column.content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ContentUnit;
