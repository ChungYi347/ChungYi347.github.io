import React from 'react';
import { css } from '@emotion/react';

import AboutPage from './AboutPage';
import PublicationPage from './PublicationsPage';
import PorjectPage from './ProjectPage';

import { useThemeContext } from '../contexts/ThemeContext';

const HomePage = () => {
  const { refs } = useThemeContext();
  return (
    <>
      <AboutPage ref={refs['ABOUT']} />
      <PublicationPage ref={refs['PUBLICATIONS']} />
      <PorjectPage ref={refs['PROJECTS']} />
    </>
  );
};

export default HomePage;
