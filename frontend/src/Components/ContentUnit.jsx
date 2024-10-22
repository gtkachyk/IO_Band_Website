import React, { useEffect, useState } from 'react';

function ContentUnit({title, columns}) {
  // Set the column header heights
  useEffect(() => {
    const setEqualHeights = () => {
      const headers = document.querySelectorAll('.content-container .column-header');
      let maxHeight = 0;

      headers.forEach(header => {
        header.style.height = 'auto';
        const headerHeight = header.getBoundingClientRect().height;
        if (headerHeight > maxHeight) {
          maxHeight = headerHeight;
        }
      });

      headers.forEach(header => {
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
          const columnWidth = column.width ? column.width : `${100 / columns.length}%`;
          return (
            <div 
              key={index} 
              className="content-column" 
              style={{flex: `1 1 calc(${columnWidth} - 1rem)`}}>
              {column.header && <h3 className="column-header">{column.header}</h3>}
              <div className="column-content">
                {column.content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ContentUnit;
