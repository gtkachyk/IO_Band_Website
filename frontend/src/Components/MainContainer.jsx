import React, { useEffect, useState } from 'react';
import '../styles/components/main_container.scss';
import '../styles/components/content_unit.scss';

const MainContainer = ({ children, page, id }) => {
  // State to hold the dynamically imported stylesheet
  const [styles, setStyles] = useState(null);
  // var scss = page.main_container_styles;

  // useEffect(() => {
  //   // Dynamically import the provided stylesheet
  //   const importStyles = async () => {
  //     try {
  //       const res = await import(page.main_container_styles);
  //       setStyles(res);
  //     } catch (error) {
  //       // Fallback to the default stylesheet if import fails
  //       console.error('Error importing stylesheet in ContentUnit.jsx: ' + error);
  //       const defaultStyles = await import('../styles/components/overwrite/content_unit_default.scss');
  //       setStyles(defaultStyles);
  //     }
  //   };

  //   importStyles();
  // }, [page.main_container_styles]);
  return <div className="main-container" id={id}>{children}</div>;
};

export default MainContainer;
