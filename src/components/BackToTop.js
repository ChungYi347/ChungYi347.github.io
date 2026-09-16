import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';

import { useThemeContext } from '../contexts/ThemeContext';
import { LiquidGlassFilter, supportsBackdropSVG } from './LiquidGlass';

/*
  떠 있는 "맨 위로" 버튼.

  Apple HIG(Materials)가 말하는 Liquid Glass 의 가장 정석적인 용도다 —
  콘텐츠 레이어 위를 떠다니는 기능 요소. 스크롤되는 논문 이미지가 버튼 뒤로
  지나가면서 유리에 비친다.

  유리 질감은 세 겹으로 만든다:
    1) backdrop-filter  — 뒤 콘텐츠를 흐리고 채도를 올린다
    2) 반투명 배경      — 본체
    3) inset 하이라이트 — 유리 윗면 반사광(specular)
*/
const GLASS_FILTER_ID = 'lg-backtotop';

const buttonStyle = (colors, visible, refract) => css`
  position: fixed;
  right: max(20px, env(safe-area-inset-right));
  bottom: max(20px, env(safe-area-inset-bottom));
  z-index: 1000;

  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border: 1px solid transparent;
  border-radius: 999px;
  cursor: pointer;
  color: ${colors.label};

  background: ${colors.glass};
  -webkit-backdrop-filter: saturate(190%) blur(22px);
  backdrop-filter: saturate(190%) blur(22px);
  /* Chromium 에서만 가장자리 굴절이 더해진다. 나머지는 위 선언으로 폴백. */
  ${refract ? `backdrop-filter: saturate(190%) blur(9px) url(#${GLASS_FILTER_ID});` : ''}
  box-shadow: ${colors.shadowGlass};

  /* 테두리 반사광 — 헤더 알약과 같은 방식 */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.4px;
    pointer-events: none;
    background: linear-gradient(
      160deg,
      ${colors.glassRimBright} 0%,
      ${colors.glassRimDim} 42%,
      ${colors.glassRimDim} 58%,
      ${colors.glassRimBounce} 100%
    );
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
  }

  /* 필요할 때만 떠오르고, 그 전에는 클릭을 가로채지 않는다 */
  opacity: ${visible ? 1 : 0};
  transform: translateY(${visible ? 0 : '12px'}) scale(${visible ? 1 : 0.9});
  pointer-events: ${visible ? 'auto' : 'none'};
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.32, 1.4, 0.5, 1), background-color 0.2s ease;

  &:hover {
    background: ${colors.glassOpaque};
  }
  &:active {
    transform: translateY(0) scale(0.92);
  }

  @media (prefers-reduced-transparency: reduce) {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    background: ${colors.glassOpaque};
  }

  svg {
    width: 20px;
    height: 20px;
    display: block;
  }
`;

const BackToTop = () => {
  const { colors } = useThemeContext();
  const [visible, setVisible] = useState(false);
  const btnRef = useRef(null);
  const [refract] = useState(supportsBackdropSVG);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <LiquidGlassFilter id={GLASS_FILTER_ID} targetRef={btnRef} band={14} scale={30} />
      <button
        ref={btnRef}
        type="button"
        css={buttonStyle(colors, visible, refract)}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="맨 위로"
        title="맨 위로"
        // 숨어 있을 때는 키보드 탭 순서에서도 빠진다
        tabIndex={visible ? 0 : -1}
        aria-hidden={!visible}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
};

export default BackToTop;
