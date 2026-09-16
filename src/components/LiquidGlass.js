import React, { useEffect, useRef, useState } from 'react';

/*
  진짜 Liquid Glass — 가장자리 굴절(edge lensing).

  흔한 "글래스모피즘"은 backdrop-filter: blur() 한 줄이다. 배경을 흐릴 뿐,
  빛을 휘지 않는다. Apple 의 Liquid Glass 가 다르게 보이는 결정적인 이유는
  가장자리에서 실제 렌즈처럼 뒤 내용을 **굴절**시키기 때문이다.

  웹에서는 SVG feDisplacementMap 으로 이걸 재현할 수 있다.
    1) 요소 모양(둥근 사각형/알약)의 부호거리장(SDF)을 계산해
    2) 가장자리 근처에서만 바깥쪽으로 밀어내는 변위 벡터를 만들고
    3) R 채널 = 가로 변위, G 채널 = 세로 변위 로 인코딩한 이미지를 만들어
    4) backdrop-filter: url(#filter) 로 뒤 배경에 적용한다.

  제약: backdrop-filter 안에서 SVG 필터를 참조하는 건 현재 Chromium 계열만
  지원한다. Safari/Firefox 는 이 값을 무시하고 앞선 blur/saturate 선언으로
  자연스럽게 폴백된다 — 그래서 굴절은 '더해지는 층'으로만 쓰고, 기본 유리
  질감은 항상 CSS 로 유지한다.
*/

// Chromium 인지 판별 — backdrop-filter 가 url() 필터를 받는지 직접 물어본다
export const supportsBackdropSVG = () => {
  if (typeof window === 'undefined' || !window.CSS || !window.CSS.supports) return false;
  return window.CSS.supports('backdrop-filter', 'url(#a)');
};

// 둥근 사각형의 부호거리장 — 안쪽이 음수, 테두리가 0
const sdRoundRect = (px, py, halfW, halfH, r) => {
  const qx = Math.abs(px) - halfW + r;
  const qy = Math.abs(py) - halfH + r;
  const outside = Math.hypot(Math.max(qx, 0), Math.max(qy, 0));
  return Math.min(Math.max(qx, qy), 0) + outside - r;
};

/**
 * 변위 맵을 그려 data URL 로 돌려준다.
 * 128 이 '변위 없음'이고, 거기서 벗어난 만큼 픽셀을 끌어온다.
 */
const buildDisplacementMap = (width, height, radius, band, strength) => {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;

  const img = ctx.createImageData(canvas.width, canvas.height);
  const data = img.data;
  const halfW = canvas.width / 2;
  const halfH = canvas.height / 2;
  const r = Math.min(radius, halfW, halfH);
  const eps = 0.75;

  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      const px = x + 0.5 - halfW;
      const py = y + 0.5 - halfH;
      const d = sdRoundRect(px, py, halfW, halfH, r);

      let dx = 0;
      let dy = 0;

      // 테두리에서 band 만큼 안쪽까지만 굴절시킨다
      if (d < 0 && d > -band) {
        // t: 테두리에서 0, 안쪽으로 갈수록 1
        const t = -d / band;
        // 유리 단면(squircle 에 가까운 프로파일) — 테두리에서 가장 세게 휜다
        const magnitude = strength * Math.pow(1 - t, 2.2);

        // SDF 의 기울기 = 바깥을 향하는 법선
        const gx = sdRoundRect(px + eps, py, halfW, halfH, r) - sdRoundRect(px - eps, py, halfW, halfH, r);
        const gy = sdRoundRect(px, py + eps, halfW, halfH, r) - sdRoundRect(px, py - eps, halfW, halfH, r);
        const len = Math.hypot(gx, gy) || 1;

        dx = (gx / len) * magnitude;
        dy = (gy / len) * magnitude;
      }

      const i = (y * canvas.width + x) * 4;
      // -1..1 범위를 0..255 로. 128 이 중립.
      data[i] = Math.max(0, Math.min(255, 128 + dx * 127));
      data[i + 1] = Math.max(0, Math.min(255, 128 + dy * 127));
      data[i + 2] = 128;
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL();
};

/**
 * 대상 요소 크기에 맞춰 굴절 필터를 만들어 두는 컴포넌트.
 *
 * @param id         필터 id. 쓰는 쪽에서 url(#id) 로 참조한다.
 * @param targetRef  유리로 만들 요소의 ref
 * @param radius     요소의 모서리 반경(px). 알약이면 높이의 절반을 넘기면 된다.
 * @param band       굴절이 일어나는 테두리 두께(px)
 * @param scale      feDisplacementMap 의 변위 배율(px)
 */
export const LiquidGlassFilter = ({ id, targetRef, radius = 999, band = 14, scale = 16 }) => {
  const [map, setMap] = useState(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const enabled = useRef(supportsBackdropSVG());

  useEffect(() => {
    const node = targetRef && targetRef.current;
    if (!node || !enabled.current) return undefined;

    // 모션 최소화/투명도 감소 설정이면 굴절도 끈다
    const reduce =
      window.matchMedia &&
      (window.matchMedia('(prefers-reduced-transparency: reduce)').matches ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (reduce) return undefined;

    let frame = 0;
    const update = () => {
      // getBoundingClientRect 는 transform(scale 등)이 섞인 값을 준다.
      // 변위 맵은 요소의 '실제' 레이아웃 크기에 맞아야 하므로 offset 을 쓴다.
      const w = node.offsetWidth;
      const h = node.offsetHeight;
      if (!w || !h) return;
      setSize((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
      setMap(buildDisplacementMap(w, h, Math.min(radius, h / 2), band, 1));
    };

    // 크기가 바뀔 때마다 맵을 다시 그린다 (다시 그리는 비용이 있으므로 프레임으로 묶는다)
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    });
    observer.observe(node);
    update();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [targetRef, radius, band]);

  if (!enabled.current || !map || !size.w) return null;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}
    >
      <defs>
        <filter id={id} colorInterpolationFilters="sRGB" x="0" y="0" width="100%" height="100%">
          <feImage href={map} x="0" y="0" width={size.w} height={size.h} result="map" />
          {/*
            R 채널로 가로, G 채널로 세로를 밀어낸다.
            이 한 줄이 '흐린 유리'와 '굴절하는 유리'를 가르는 부분이다.
          */}
          <feDisplacementMap in="SourceGraphic" in2="map" scale={scale} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
};

/**
 * 대상 요소에 붙일 backdrop-filter 값을 만든다.
 * Chromium 이면 굴절을 얹고, 아니면 기존 blur/saturate 만 남는다.
 */
export const glassBackdrop = (filterId, base = 'saturate(190%) blur(22px)') =>
  filterId ? `${base} url(#${filterId})` : base;

export default LiquidGlassFilter;
