import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Storage } from '../common';

const Context = createContext();

export const useThemeContext = () => useContext(Context);

const MODES = ['light', 'dark', 'auto'];
const DARK_QUERY = '(prefers-color-scheme: dark)';

const prefersDark = () => (window.matchMedia ? window.matchMedia(DARK_QUERY).matches : false);

// 저장된 값이 없으면 'auto'. 시스템 설정을 그대로 따르는 것이 Apple HIG의 기본 권장이다.
const getStoredMode = () => {
  const stored = Storage.get('theme');
  return MODES.includes(stored) ? stored : 'auto';
};

/**
 * 시맨틱 컬러 토큰.
 * 값이 아니라 "역할"로 이름을 붙였다 (Apple HIG: Color - dynamic system colors).
 * 다크 팔레트는 라이트의 단순 반전이 아니라 개별적으로 정의한다.
 */
const light = {
  // 배경 — 레벨이 올라갈수록 앞으로 나온다
  bg: '#eef0f4', // 페이지 바탕 — 카드(흰색)와 명도차를 벌려 깊이감을 준다
  bgElevated: '#ffffff', // 카드, 모달
  bgSunken: '#e3e6ec', // 움푹 들어간 영역
  /*
    바탕에 얹는 앰비언트 톤. 평평한 회색 한 장이면 화면이 밋밋해 보이므로
    브랜드 민트를 아주 옅게 두 군데 깔아 은은한 깊이를 만든다.
    대비 계산에 영향을 주지 않도록 불투명도를 5% 이하로 유지한다.
  */
  ambient:
    'radial-gradient(70% 50% at 12% -5%, rgba(3, 194, 201, 0.10), transparent 62%), ' +
    'radial-gradient(60% 45% at 95% 8%, rgba(88, 86, 214, 0.07), transparent 60%)',
  fill: 'rgba(120, 120, 128, 0.12)', // 칩, 트랙 등 채움
  fillSubtle: 'rgba(120, 120, 128, 0.08)',

  // 텍스트
  label: '#1c1c1e',
  // Apple 의 secondaryLabel(α 0.6)을 그대로 쓰면 흰 배경에서 3.9:1 로 AA 미달이라
  // 같은 색상에서 불투명도만 올려 4.8:1 을 확보했다.
  labelSecondary: 'rgba(60, 60, 67, 0.75)',
  labelTertiary: 'rgba(60, 60, 67, 0.62)',

  separator: 'rgba(60, 60, 67, 0.12)', // 카드 테두리는 은은하게 — 그림자가 경계를 만든다

  /*
    강조색은 브랜드 민트 하나로 통일한다. 이전에는 링크용 어두운 청록과
    밑줄용 밝은 민트가 섞여 화면에 두 가지 톤이 보였다.
    (밝은 민트는 흰 배경 대비가 낮으므로 링크에는 밑줄을 항상 표시해
     색에만 의존하지 않게 한다 — HIG: Inclusive color)
  */
  accent: '#03c2c9',
  accentBright: '#03c2c9',
  accentSoft: 'rgba(3, 194, 201, 0.14)',

  // 떠 있는 레이어 (Liquid Glass)
  glass: 'rgba(255, 255, 255, 0.60)',
  glassBorder: 'rgba(255, 255, 255, 0.70)',
  glassSpecular: 'rgba(255, 255, 255, 0.85)', // 유리 윗면 반사광
  glassSweepBlend: 'overlay', // 밝은 표면에서는 overlay 가 자연스럽다
  /*
    테두리 반사광(rim light). 진짜 유리는 테두리 전체가 고르게 빛나지 않고,
    빛을 마주보는 쪽(좌상단)과 반대쪽에서 되비치는 쪽(우하단)만 밝다.
    아래 두 색을 각도 그라데이션으로 돌려 그 차이를 만든다.
  */
  glassRimBright: 'rgba(255, 255, 255, 0.95)',
  glassRimDim: 'rgba(255, 255, 255, 0.12)',
  glassRimBounce: 'rgba(255, 255, 255, 0.45)', // 아랫면에 되비치는 빛
  glassOpaque: '#fafafa', // 투명도 감소 설정 시 폴백

  // 층을 나눈 부드러운 그림자 — 단일 그림자보다 자연스럽게 떠 보인다
  shadow: '0 1px 2px rgba(16, 24, 40, 0.04), 0 8px 24px -8px rgba(16, 24, 40, 0.12)',
  shadowStrong: '0 2px 4px rgba(16, 24, 40, 0.06), 0 24px 48px -12px rgba(16, 24, 40, 0.22)',
  shadowGlass: '0 1px 2px rgba(16, 24, 40, 0.06), 0 12px 32px -8px rgba(16, 24, 40, 0.18)',
};

const dark = {
  bg: '#000000',
  bgElevated: '#1c1c1e',
  bgSunken: '#0a0a0c',
  ambient:
    'radial-gradient(70% 50% at 12% -5%, rgba(3, 194, 201, 0.10), transparent 62%), ' +
    'radial-gradient(60% 45% at 95% 8%, rgba(94, 92, 230, 0.10), transparent 60%)',
  fill: 'rgba(120, 120, 128, 0.24)',
  fillSubtle: 'rgba(120, 120, 128, 0.16)',

  label: '#ffffff',
  labelSecondary: 'rgba(235, 235, 245, 0.70)',
  labelTertiary: 'rgba(235, 235, 245, 0.55)',

  separator: 'rgba(84, 84, 88, 0.6)',

  accent: '#03c2c9',
  accentBright: '#03c2c9',
  accentSoft: 'rgba(3, 194, 201, 0.16)',

  glass: 'rgba(28, 28, 30, 0.62)',
  glassBorder: 'rgba(255, 255, 255, 0.12)',
  glassSpecular: 'rgba(255, 255, 255, 0.22)',
  glassSweepBlend: 'screen', // 어두운 표면에서는 빛을 더하는 screen
  glassRimBright: 'rgba(255, 255, 255, 0.55)',
  glassRimDim: 'rgba(255, 255, 255, 0.04)',
  glassRimBounce: 'rgba(255, 255, 255, 0.22)',
  glassOpaque: '#1c1c1e',

  shadow: '0 8px 28px rgba(0, 0, 0, 0.5)',
  shadowStrong: '0 16px 48px rgba(0, 0, 0, 0.7)',
  shadowGlass: '0 8px 32px rgba(0, 0, 0, 0.55), 0 1px 2px rgba(0, 0, 0, 0.4)',
};

const palettes = { light, dark };

export default function ThemeContext({ children }) {
  const [mode, setMode] = useState(getStoredMode); // 'light' | 'dark' | 'auto'
  const [systemDark, setSystemDark] = useState(prefersDark);
  const [open, setOpen] = useState(false);
  const refs = { ABOUT: useRef(null), PUBLICATIONS: useRef(null), PROJECTS: useRef(null) };

  // 시스템 외관이 바뀌면 즉시 따라간다 (auto 모드일 때 의미가 있다)
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mql = window.matchMedia(DARK_QUERY);
    const onChange = (e) => setSystemDark(e.matches);
    // Safari 13 이하는 addEventListener 를 지원하지 않는다
    if (mql.addEventListener) mql.addEventListener('change', onChange);
    else mql.addListener(onChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', onChange);
      else mql.removeListener(onChange);
    };
  }, []);

  const theme = mode === 'auto' ? (systemDark ? 'dark' : 'light') : mode;
  const isLight = theme === 'light';
  const colors = useMemo(() => palettes[theme], [theme]);

  // 문서 루트에 반영 — 스크롤바/폼 컨트롤까지 테마를 맞추기 위해 color-scheme 도 함께 설정
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    root.style.background = '';
  }, [theme]);

  // light -> dark -> auto -> light 순환
  const cycleTheme = useCallback(() => {
    setMode((prev) => {
      const next = MODES[(MODES.indexOf(prev) + 1) % MODES.length];
      Storage.set('theme', next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ colors, theme, mode, isLight, cycleTheme, open, setOpen, refs }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [colors, theme, mode, isLight, cycleTheme, open]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
