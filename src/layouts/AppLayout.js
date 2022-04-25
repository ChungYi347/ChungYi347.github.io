import React from 'react';
import { css, Global } from '@emotion/react';

import Header from './Header';
import Footer from './Footer';
import { useThemeContext } from '../contexts/ThemeContext';

const globalStyle = (colors, isLight) => css`
  body {
    color: ${colors.gray[9]};
    background: ${colors.gray[1]};
    transition-duration: 0.3s;
    transition-timing-function: ease;
    transition-property: border, background, color;
  }

  main {
    flex: 1;
    margin: 0 auto;
    max-width: 1280px;
    display: flex;
    flex-direction: column;
  }

  h4 {
    font-size: 3rem;
  }
  h5 {
    font-size: 2rem;
  }
  h6 {
    font-size: 1.5rem;
  }

  @media (max-width: 1080px) {
    h4 {
      font-size: 2.5rem;
    }
    h5 {
      font-size: 1.5rem;
    }
    h6 {
      font-size: 1rem;
    }
  }

  @media (max-width: 640px) {
    h4 {
      font-size: 2rem;
    }
    h5 {
      font-size: 1rem;
    }
    h6 {
      font-size: 0.75rem;
    }
  }
`;

const AppLayout = ({ children }) => {
  const { colors, isLight } = useThemeContext();

  return (
    <div css={[globalStyle(colors, isLight)]}>
      <Global styles={[globalStyle(colors)]} />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;
