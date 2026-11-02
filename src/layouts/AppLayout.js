import React, { useMemo } from 'react';
import { css, Global } from '@emotion/react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Header from './Header';
import Footer from './Footer';
import BackToTop from '../components/BackToTop';
import { useThemeContext } from '../contexts/ThemeContext';

const FONT_STACK = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"SF Pro Text"',
  'system-ui',
  '"Segoe UI"',
  'Roboto',
  '"Apple SD Gothic Neo"',
  '"Noto Sans KR"',
  'Helvetica',
  'Arial',
  'sans-serif',
].join(',');

/*
  타입 스케일.
  clamp() 로 뷰포트에 따라 매끄럽게 줄어들되 하한을 두어, 좁은 화면에서도
  본문이 15px 아래로 내려가지 않게 한다 (Apple UI Design Dos and Don'ts: 최소 11pt).
*/
const buildTheme = (colors, mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: colors.accent },
      background: { default: colors.bg, paper: colors.bgElevated },
      text: {
        primary: colors.label,
        secondary: colors.labelSecondary,
        disabled: colors.labelTertiary,
      },
      divider: colors.separator,
    },
    typography: {
      fontFamily: FONT_STACK,
      // 섹션 제목
      h4: {
        fontSize: 'clamp(1.75rem, 1.35rem + 1.6vw, 2.5rem)',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
      },
      // 서브섹션 제목 (Education, News ...)
      h5: {
        fontSize: 'clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem)',
        fontWeight: 650,
        letterSpacing: '-0.015em',
        lineHeight: 1.3,
      },
      // 카드 제목
      h6: {
        fontSize: 'clamp(1.0625rem, 1rem + 0.35vw, 1.25rem)',
        fontWeight: 600,
        letterSpacing: '-0.01em',
        lineHeight: 1.35,
      },
      // 본문
      body1: {
        fontSize: 'clamp(1rem, 0.96rem + 0.2vw, 1.0625rem)',
        lineHeight: 1.65,
        letterSpacing: '-0.003em',
      },
      // 보조 본문 (저자명, 학회명 등)
      body2: {
        fontSize: 'clamp(0.9375rem, 0.92rem + 0.1vw, 1rem)',
        lineHeight: 1.55,
      },
      caption: {
        fontSize: '0.8125rem',
        lineHeight: 1.45,
      },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: { borderRadius: 16 },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            border: `1px solid ${colors.separator}`,
            boxShadow: colors.shadow,
          },
        },
      },
      MuiLink: {
        defaultProps: { underline: 'always' },
        styleOverrides: {
          root: {
            color: colors.accent,
            fontWeight: 500,
            textDecorationColor: colors.accentSoft,
            textUnderlineOffset: '0.18em',
            '&:hover': { textDecorationColor: colors.accent },
            '&:focus-visible': { outline: `2px solid ${colors.accent}`, outlineOffset: 2 },
          },
        },
      },
    },
  });

const globalStyle = (colors) => css`
  body {
    color: ${colors.label};
    background-color: ${colors.bg};
    background-image: ${colors.ambient};
    /* 스크롤해도 톤이 따라 흐르지 않고 화면에 고정되게 */
    background-attachment: fixed;
    background-repeat: no-repeat;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  main {
    flex: 1;
    width: 100%;
    margin: 0 auto;
    max-width: 1280px;
    /* 고정 헤더(60px) + 노치 높이만큼 비워둔다 — 없으면 첫 섹션 제목이 헤더에 가린다 */
    padding: calc(60px + env(safe-area-inset-top)) 20px 0;
    display: flex;
    flex-direction: column;
  }

  /*
    고정 헤더 뒤로 섹션 제목이 숨는 것을 막는다.
    이전에는 scrollIntoView 가 헤더 높이를 고려하지 않아 제목이 가려졌다.
  */
  [data-section] {
    scroll-margin-top: 84px;
  }

  ::selection {
    background: ${colors.accentSoft};
  }

  /* 스크롤바도 테마를 따르게 */
  * {
    scrollbar-color: ${colors.labelTertiary} transparent;
  }
`;

const AppLayout = ({ children }) => {
  const { colors, theme } = useThemeContext();
  const muiTheme = useMemo(() => buildTheme(colors, theme), [colors, theme]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Global styles={globalStyle(colors)} />
      <Header />
      <main>{children}</main>
      <Footer />
      <BackToTop />
    </MuiThemeProvider>
  );
};

export default AppLayout;
