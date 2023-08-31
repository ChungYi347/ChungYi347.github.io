import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import { media } from '../styles/media';
import { useThemeContext } from '../contexts/ThemeContext';

import { ReactComponent as SunIcon } from '../assets/sun.svg';
import { ReactComponent as MoonIcon } from '../assets/moon.svg';
import { Typography } from '@mui/material';

import CVPDF from '../assets/pdfs/Chunggi_Lee_CV.pdf';

const headerStyle = (colors, isLight) => css`
  height: 60px;

  ${media.medium} {
    height: 50px;
  }

  box-shadow: ${isLight ? 'rgba(0, 0, 0, 0.24) 0px 3px 8px' : 'rgba(255, 255, 255, 0.24) 0px 3px 8px'};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
  background-color: ${isLight ? '#f5f5f5' : '#525252'};

  & > nav {
    height: 100%;
    display: flex;
    padding: 0 12px;
    margin: 0 auto;
    max-width: 1280px;
    align-items: center;
    justify-content: space-between;

    .logo a {
      height: 100%;
      display: flex;
      align-items: center;
      // font-size: 2rem;
      // font-weight: bold;
      text-decoration: none;
      text-transform: uppercase;
      color: ${isLight ? 'black' : 'white'};

      svg {
        width: 2rem;
        height: 2rem;
        margin-right: 0.5rem;
      }
    }

    svg {
      cursor: pointer;
      color: ${isLight ? 'inherit' : colors.yellow[4]};
      fill: ${colors.yellow[6]};
    }

    svg.theme {
      display: flex;
      user-select: none;
    }
  }
`;

const links = [
  { name: 'ABOUT', link: '/' },
  { name: 'PUBLICATIONS', link: '/' },
  { name: 'PROJECTS', link: '/' },
  { name: 'CV', link: CVPDF },
];

const Header = () => {
  const { pathname } = useLocation();
  const { colors, isLight, toggleTheme, refs } = useThemeContext();

  return (
    <header css={[headerStyle(colors, isLight)]}>
      <nav>
        <Typography variant={'h5'} sx={{ fontWeight: 600 }}>
          <div className="logo">
            <Link to="/" replace={pathname === '/'}>
              Chunggi Lee
            </Link>
          </div>
        </Typography>
        {links.map((elem) =>
          elem['name'] === 'CV' ? (
            <Typography
              onClick={() => refs[elem['name']].current.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              variant="h6"
              color={isLight ? 'black' : 'white'}
            >
              <a href={CVPDF} target="_blank">
                {elem['name']}
              </a>
            </Typography>
          ) : (
            <Typography
              onClick={() => refs[elem['name']].current.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              variant="h6"
              color={isLight ? 'black' : 'white'}
            >
              <Link to={elem['link']}>{elem['name']}</Link>
            </Typography>
          )
        )}
        <div>
          {isLight ? (
            <SunIcon className="theme" onClick={toggleTheme} />
          ) : (
            <MoonIcon className="theme" onClick={toggleTheme} />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
