import NavBar from '../Components/NavBar';
import React, { useState, useEffect } from 'react';
import '../styles/about.scss';
import { about } from '../assets/about.js';

function About () {
  // State variables
  const [summary, setSummary] = useState('');

  // Set page background
  useEffect(() => {
    document.body.style.backgroundImage = `url('${about.background_image}')`;
  }, []);

  // Get summary text from file
  useEffect(() => {
    fetch(about.summary_text)
      .then((res) => res.text())
      .then((text) => {
        setSummary(text);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <>
      <div className="about-page-container">
        <NavBar></NavBar>
        <div className="about-page-content-container">
          <div className="summary-title-container">
            <h2 className="summary-title">Summary</h2>
          </div>
          <div className="summary-container">{summary}</div>
          <div className="gear-title-container">
            <h2 className="gear-title">Gear</h2>
          </div>
          <div className="gear-container">Coming soon...</div>
          <div className="footer"></div>
        </div>
      </div>
    </>
  );
}

export default About;
