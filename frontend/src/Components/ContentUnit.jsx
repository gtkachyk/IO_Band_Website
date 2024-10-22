import React, { useEffect } from 'react';
import '../styles/content_unit.scss';

function ContentUnit({title, columns, styleSheet}) {
  // Import scss for this unit
  let styles;
  import(`${styleSheet}`).then((res) => {styles = res;}).catch((error) => {import(`../styles/content_unit_default.scss`).then((res) => {styles = res;})});

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
