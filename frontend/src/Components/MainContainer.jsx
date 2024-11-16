import React, { useEffect, useState } from 'react';
import '../styles/main_container.scss';
import '../styles/content_unit.scss';

const MainContainer = ({ children, styleSheet }) => {
  // State to hold the dynamically imported stylesheet
  const [styles, setStyles] = useState(null);

  useEffect(() => {
    // Dynamically import the provided stylesheet
    const importStyles = async () => {
      try {
        const res = await import(`${styleSheet}`);
        setStyles(res);
      } catch (error) {
        // Fallback to the default stylesheet if import fails
        console.error('Error importing stylesheet in ContentUnit.jsx: ' + error);
        const defaultStyles = await import('../styles/content_unit_default.scss');
        setStyles(defaultStyles);
      }
    };

    importStyles();
  }, [styleSheet]);
  return <div className="main-container">{children}</div>;
};

export default MainContainer;
