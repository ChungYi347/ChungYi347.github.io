import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';

import { useThemeContext } from '../contexts/ThemeContext';
import { LiquidGlassFilter, supportsBackdropSVG } from '../components/LiquidGlass';
import CVPDF from '../assets/pdfs/Chunggi_Lee_CV.pdf';

/*
  Liquid Glass 헤더.

  Apple HIG(Materials)는 이 재질을 "콘텐츠 위에 떠 있는 기능 레이어"에만 쓰라고 한다.
  고정 헤더가 정확히 그 경우다. 반대로 논문/프로젝트 카드는 콘텐츠 레이어이므로
  불투명하게 둔다.

  스크롤 전에는 투명하게 두고, 콘텐츠가 뒤로 지나가기 시작하면 유리 알약이
  떠오르듯 나타난다 (scroll edge effect).

  유리의 질감은 세 겹으로 만든다:
    1) backdrop-filter  — 뒤 콘텐츠를 흐리고 채도를 올린다
    2) 반투명 배경      — 본체
    3) inset 하이라이트 — 유리 윗면에 닿는 반사광(specular). 이게 있어야
                          단순한 '반투명 판'이 아니라 입체적인 유리로 보인다
*/
const GLASS_FILTER_ID = 'lg-header';

const headerStyle = (colors, scrolled, refract, compact) => css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1100;
  padding: 0 16px;
  padding-top: calc(env(safe-area-inset-top) + 8px);
  pointer-events: none;

  & > nav {
    position: relative;
    pointer-events: auto;
    /*
      iOS 26 의 탭 바처럼, 콘텐츠를 읽어 내려갈 때는 알약이 납작해졌다가
      위로 스크롤하면 다시 펴진다. 링크를 없애지는 않는다 — 폰과 달리
      데스크톱은 화면이 넉넉하고, 섹션 이동을 막으면 오히려 불편하다.
    */
    height: ${compact ? 42 : 52}px;
    display: flex;
    gap: 2px;
    align-items: center;
    margin: 0 auto;
    max-width: 1100px;
    padding: 0 8px 0 16px;
    border-radius: 999px;

    background: ${scrolled ? colors.glass : 'transparent'};
    /* 테두리 색은 rim light(::before)가 맡으므로 여기서는 투명하게 둔다 */
    border: 1px solid transparent;
    /*
      아래 줄 순서가 중요하다. Safari/Firefox 는 url() 을 이해하지 못해
      이 선언 전체를 버리고 바로 위의 blur/saturate 선언으로 되돌아간다.
    */
    -webkit-backdrop-filter: ${scrolled ? 'saturate(190%) blur(22px)' : 'none'};
    backdrop-filter: ${scrolled ? 'saturate(190%) blur(22px)' : 'none'};
    ${scrolled && refract ? `backdrop-filter: saturate(190%) blur(10px) url(#${GLASS_FILTER_ID});` : ''}

    box-shadow: ${scrolled ? colors.shadowGlass : 'none'};

    transition: background-color 0.35s ease, box-shadow 0.35s ease, height 0.3s ease;
  }

  /*
    테두리 반사광(rim light).

    평평한 inset 1px 선은 '테두리를 그린 것'이지 반사가 아니다. 진짜 유리는
    빛을 마주보는 면만 밝고 나머지는 어둡다. 각도 그라데이션을 테두리에만
    남기는 mask 기법으로 그 차이를 만든다 — 좌상단이 가장 밝고, 우하단에
    되비침이 한 번 더 온다.
  */
  & > nav::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.4px;
    pointer-events: none;
    opacity: ${scrolled ? 1 : 0};
    transition: opacity 0.35s ease;
    background: linear-gradient(
      to bottom,
      ${colors.glassRimBright} 0%,
      ${colors.glassRimDim} 40%,
      ${colors.glassRimDim} 58%,
      ${colors.glassRimBounce} 100%
    );
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
  }

  /*
    스페큘러 스윕 — 유리 표면을 훑고 지나가는 하이라이트.
    굴절과 달리 모든 브라우저에서 동작하고, "표면이 있다"는 느낌을 준다.
  */
  & > nav::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    opacity: ${scrolled ? 1 : 0};
    transition: opacity 0.35s ease;
    background: linear-gradient(105deg, transparent 30%, ${colors.glassSpecular} 45%, transparent 60%);
    background-size: 280% 100%;
    animation: glassSweep 7s ease-in-out infinite;
    mix-blend-mode: ${colors.glassSweepBlend};
  }

  @keyframes glassSweep {
    0%,
    62% {
      background-position: 180% 0;
    }
    100% {
      background-position: -80% 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    & > nav::after {
      animation: none;
      background: none;
    }
  }

  /*
    투명도 감소 설정에서는 유리를 불투명 배경으로 대체한다.
    HIG 는 Reduce Transparency / Increase Contrast 조합으로 테스트하라고 명시한다.
  */
  @media (prefers-reduced-transparency: reduce) {
    & > nav {
      -webkit-backdrop-filter: none;
      backdrop-filter: none;
      background: ${scrolled ? colors.glassOpaque : 'transparent'};
    }
  }

  /* 페이지 읽은 정도를 알려주는 얇은 진행 표시 — 유리 알약 아래쪽 테두리를 따라 흐른다 */
  .progress {
    position: absolute;
    left: 16px;
    right: 16px;
    bottom: 0;
    height: 2px;
    border-radius: 999px;
    overflow: hidden;
    opacity: ${scrolled ? 1 : 0};
    transition: opacity 0.35s ease;
    pointer-events: none;
  }
  .progress > i {
    display: block;
    height: 100%;
    border-radius: 999px;
    background: ${colors.accent};
    transform-origin: left center;
    transition: transform 0.1s linear;
  }

  .brand {
    margin-right: auto;
    font-size: ${compact ? '0.95rem' : '1.0625rem'};
    font-weight: 650;
    letter-spacing: -0.015em;
    color: ${colors.label};
    background: none;
    border: none;
    padding: 8px 4px;
    cursor: pointer;
    font-family: inherit;
    white-space: nowrap;
  }

  .nav-link {
    font-family: inherit;
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: ${colors.labelSecondary};
    background: none;
    border: none;
    cursor: pointer;
    /* 44x44 최소 터치 영역 (HIG Layout) — 시각적 크기는 그대로 두고 패딩으로 확보 */
    padding: ${compact ? '9px 9px' : '12px 11px'};
    min-height: ${compact ? 38 : 44}px;
    border-radius: 999px;
    transition: color 0.2s ease, background-color 0.2s ease, padding 0.3s ease, min-height 0.3s ease;

    &:hover {
      color: ${colors.label};
      background: ${colors.fillSubtle};
    }

    /*
      현재 보고 있는 섹션 표시.
      HIG(Branding)는 강조색을 넓게 쓰지 말고 "주요 동작이나 상태 표시 —
      예: 탭 바에서 선택된 탭" 에 의도적으로 쓰라고 한다. 여기가 그 용도다.
    */
    &[aria-current='true'] {
      color: ${colors.accent};
      background: ${colors.accentSoft};
    }

    @media (max-width: 767px) {
      display: none;
    }
  }

  .nav-link--always {
    @media (max-width: 767px) {
      display: inline-flex;
      align-items: center;
    }
  }

  .theme-btn {
    margin-left: 2px;
    width: ${compact ? 38 : 44}px;
    height: ${compact ? 38 : 44}px;
    display: grid;
    place-items: center;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    color: ${colors.labelSecondary};
    background: transparent;
    transition: background-color 0.2s ease, color 0.2s ease, transform 0.15s ease, width 0.3s ease, height 0.3s ease;

    &:hover {
      background: ${colors.fill};
      color: ${colors.label};
    }
    &:active {
      transform: scale(0.9);
    }

    svg {
      width: 20px;
      height: 20px;
      display: block;
    }
  }
`;

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5a8.5 8.5 0 1 0 10.8 10.8z" />
  </svg>
);

// 시스템 설정을 따름 — 반쪽만 채운 원으로 표현
const AutoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none" />
  </svg>
);

const THEME_UI = {
  light: { Icon: SunIcon, label: '테마: 라이트 (클릭하면 다크로)' },
  dark: { Icon: MoonIcon, label: '테마: 다크 (클릭하면 시스템 설정 따름)' },
  auto: { Icon: AutoIcon, label: '테마: 시스템 설정 따름 (클릭하면 라이트로)' },
};

const SECTIONS = [
  { name: 'ABOUT', key: 'ABOUT' },
  { name: 'PUBLICATIONS', key: 'PUBLICATIONS' },
  { name: 'PROJECTS', key: 'PROJECTS' },
];

const Header = () => {
  const { colors, mode, cycleTheme, refs } = useThemeContext();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('ABOUT');
  const [progress, setProgress] = useState(0);
  const navRef = useRef(null);
  const [compact, setCompact] = useState(false);
  const lastY = useRef(0);
  // 굴절은 Chromium 에서만 얹힌다. 나머지는 CSS 유리 질감만으로도 충분히 성립한다.
  const [refract] = useState(supportsBackdropSVG);

  /*
    스크롤 처리 — edge effect, 읽기 진행률, 현재 섹션을 한 번에 계산한다.

    처음에는 IntersectionObserver 로 섹션을 감지했는데, 각 섹션이 화면보다 길어
    교차 상태가 좀처럼 바뀌지 않아 콜백이 제때 발화하지 않았다. 스크롤 위치에서
    직접 계산하는 편이 확실하다.
  */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);

      // 화면 상단에서 1/3 지점을 기준선으로 삼아, 그 선을 지난 마지막 섹션을 활성으로 본다
      const line = window.innerHeight / 3;
      let current = SECTIONS[0].key;
      for (const section of SECTIONS) {
        const node = refs[section.key] && refs[section.key].current;
        if (node && node.getBoundingClientRect().top <= line) current = section.key;
      }
      // 바닥에 닿으면 마지막 섹션을 확실히 활성화한다 (짧은 섹션이 기준선에 못 닿는 경우 대비)
      if (max > 0 && max - y < 4) current = SECTIONS[SECTIONS.length - 1].key;
      setActive(current);

      /*
        스크롤 방향에 따라 알약을 접었다 편다.
        6px 이하의 미세한 움직임은 무시해야 손을 떨 때 헤더가 깜빡이지 않는다.
      */
      const delta = y - lastY.current;
      if (Math.abs(delta) > 6) {
        if (y < 240) setCompact(false);
        else setCompact(delta > 0);
        lastY.current = y;
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [refs]);

  const scrollTo = (key) => {
    const node = refs[key] && refs[key].current;
    if (node) node.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const { Icon, label } = THEME_UI[mode] || THEME_UI.auto;

  return (
    <header css={headerStyle(colors, scrolled, refract, compact)}>
      <LiquidGlassFilter id={GLASS_FILTER_ID} targetRef={navRef} band={20} scale={42} />
      <nav ref={navRef} aria-label="주요 탐색">
        <button type="button" className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Chunggi Lee
        </button>

        {SECTIONS.map((section) => (
          <button
            key={section.key}
            type="button"
            className="nav-link"
            aria-current={active === section.key ? 'true' : undefined}
            onClick={() => scrollTo(section.key)}
          >
            {section.name}
          </button>
        ))}

        <a className="nav-link nav-link--always" href={CVPDF} target="_blank" rel="noopener noreferrer">
          CV
        </a>

        <button type="button" className="theme-btn" onClick={cycleTheme} aria-label={label} title={label}>
          <Icon />
        </button>

        <span className="progress" aria-hidden="true">
          <i style={{ transform: `scaleX(${progress})` }} />
        </span>
      </nav>
    </header>
  );
};

export default Header;
