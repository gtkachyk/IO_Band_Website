import NavBar from '../Components/NavBar';
import React, { useState, useEffect } from 'react';
import { about } from '../assets/about.js';
import MainContainer from '../Components/MainContainer.jsx';
import ContentUnit from '../Components/ContentUnit.jsx';
import '../styles/routes/about/local.scss';
import '../styles/routes/about/overwrite/main_container.scss'
import '../styles/routes/about/overwrite/content_unit.scss';

function About () {
  // State variables
  const [summary, setSummary] = useState('');

  // Get summary text from file
  useEffect(() => {
    fetch(about.summary_text)
      .then((res) => res.text())
      .then((text) => {
        setSummary(text);
      })
      .catch((e) => console.error(e));
  }, []);

  // Create content units
  const contentUnits = [
    {
      title: 'Summary',
      columns: [{ content: summary, id: 'summary-column' }],
    },
    {
      title: 'Gear',
      columns: [{ content: 'Coming soon...', id: 'gear-column' }],
    },
  ];

  return (
    <>
      <NavBar></NavBar>
      <MainContainer styleSheet={`../styles/routes/about/overwrite/content_unit.scss`} id={'about'}>
        <ContentUnit title={contentUnits[0].title} columns={contentUnits[0].columns}></ContentUnit>
        <ContentUnit title={contentUnits[1].title} columns={contentUnits[1].columns}></ContentUnit>
      </MainContainer>
    </>
  );
}

export default About;
