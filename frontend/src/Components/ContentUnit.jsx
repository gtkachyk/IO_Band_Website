import React from 'react';
import '../styles/content_unit.scss';

function ContentUnit({ title, columns }) {
    return (
      <div className="unit">
        {title && <h2 className="unit-title">{title}</h2>}
        <div className="content-container">
          {columns.map((column, index) => {
            const columnWidth = column.width ? column.width : `${100 / columns.length}%`;  // Default to equal width
            return (
              <div 
                key={index} 
                className="content-column" 
                style={{flex: `1 1 calc(${columnWidth} - 1rem)`}}>  {/* Apply dynamic width */}
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

