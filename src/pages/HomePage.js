import React from 'react';

import AboutPage from './AboutPage';
import PublicationsPage from './PublicationsPage';
import ProjectPage from './ProjectPage';
import { useThemeContext } from '../contexts/ThemeContext';

const HomePage = () => {
  const { refs } = useThemeContext();

  return (
    <>
      <AboutPage ref={refs.ABOUT} />
      <PublicationsPage ref={refs.PUBLICATIONS} />
      <ProjectPage ref={refs.PROJECTS} />
    </>
  );
};

export default HomePage;
