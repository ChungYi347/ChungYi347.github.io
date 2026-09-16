import React from 'react';
import { css } from '@emotion/react';

import { useThemeContext } from '../contexts/ThemeContext';

// svgr 의 ReactComponent 이중 export 에 의존하면 개발 서버에서 깨지므로 인라인으로 둔다
const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const footerStyle = (colors) => css`
  margin-top: 64px;
  border-top: 1px solid ${colors.separator};
  /* iOS 홈 인디케이터 영역 확보 */
  padding-bottom: env(safe-area-inset-bottom);

  & > nav {
    margin: 0 auto;
    max-width: 1280px;
    padding: 28px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    color: ${colors.labelSecondary};
    font-size: 0.8125rem;
  }

  a {
    /* 44x44 최소 터치 영역 */
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    border-radius: 999px;
    color: ${colors.labelSecondary};
    transition: color 0.2s ease, background-color 0.2s ease;

    &:hover {
      color: ${colors.label};
      background: ${colors.fillSubtle};
    }

    svg {
      width: 22px;
      height: 22px;
      display: block;
    }
  }
`;

const Footer = () => {
  const { colors } = useThemeContext();

  return (
    <footer css={footerStyle(colors)}>
      <nav>
        <span>© {new Date().getFullYear()} Chunggi Lee</span>
        <a
          href="https://github.com/ChungYi347"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="GitHub 프로필 (새 탭에서 열림)"
        >
          <GithubIcon />
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
