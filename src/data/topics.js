/*
  논문 주제 라벨.

  학회가 아니라 '내용' 기준으로 나눴다. 같은 CHI 논문이라도 하나는 XR 상호작용,
  하나는 시각화일 수 있고, 반대로 VIS 와 EMNLP 논문이 같은 갈래일 수 있다.
  목록만 봐서는 안 보이던 연구의 줄기를 드러내는 것이 목적이다.

  클릭할 수 없는 '라벨'이다. 필터가 아니다 — 17편 규모에서는 방문자에게
  분야를 먼저 고르게 하는 비용이 얻는 것보다 크고, 무엇보다 여러 분야에
  걸쳐 있다는 점 자체가 강점인데 필터가 그걸 숨긴다.
  (나중에 40편쯤 되면 이 데이터를 그대로 필터 재료로 쓸 수 있다.)


  ─────────────────────────────────────────────────────────────
  색을 이렇게 정한 근거 (Apple HIG)
  ─────────────────────────────────────────────────────────────

  1) 색상(hue)은 Apple 시스템 팔레트의 12색 중에서 골랐다.
     HIG Color 문서가 정의하는 12색: Red, Orange, Yellow, Green, Mint, Teal,
     Cyan, Blue, Indigo, Purple, Pink, Brown. 여기서 Indigo / Orange / Pink /
     Green 을 쓰고, 나머지 하나는 무채색으로 뒀다.

  2) 값은 Apple 값을 그대로 베끼지 않고 직접 계산했다.
     HIG 가 명시한다 — "Avoid hard-coding system color values in your app.
     Documented color values are for your reference during the app design
     process. The actual color values may fluctuate from release to release."
     애초에 웹에서는 시스템 색 API 를 못 쓰므로, 같은 '색상'을 유지하면서
     대비를 직접 맞추는 편이 맞다.

  3) 브랜드 민트(#03c2c9, 색상각 186°)와 떨어뜨렸다.
     민트는 이 사이트에서 "누를 수 있음"을 뜻한다. HIG Color:
     "Avoid using the same color to mean different things."
     가장 가까운 Green 도 46° 떨어져 있고 명도 차이까지 있어 구분된다.

  4) 네 가지 상태를 각각 정의했다 — Apple 이 모든 시스템 컬러에 대해
     Default(light) / Default(dark) / Increased contrast(light) /
     Increased contrast(dark) 를 문서화하는 것과 같은 구조다.
     기본은 4.5:1, Increase Contrast 설정에서는 7:1 을 넘긴다.

  5) 색에만 기대지 않는다. HIG Inclusive color:
     "Avoid relying solely on color to differentiate between objects,
      indicate interactivity, or communicate essential information."
     그래서 라벨은 각진 사각(6px) + 기본 커서, 링크 칩은 알약 + 포인터 커서로
     모양과 동작까지 갈라 뒀다.
*/
export const TOPICS = {
  interaction: {
    label: 'Interaction & XR',
    hue: 'Orange',
    light: { fg: '#9a5b0e', tint: 'rgba(154, 91, 14, 0.12)', hc: '#6e3e07' },
    dark: { fg: '#ff9f0a', tint: 'rgba(255, 159, 10, 0.14)', hc: '#f6b76f' },
  },
  vision: {
    label: 'Computer Vision',
    hue: 'Indigo',
    light: { fg: '#4338ca', tint: 'rgba(67, 56, 202, 0.12)', hc: '#400ed8' },
    dark: { fg: '#a5a0f5', tint: 'rgba(165, 160, 245, 0.10)', hc: '#c1aefa' },
  },
  speech: {
    label: 'Speech & Language',
    hue: 'Pink',
    light: { fg: '#be1560', tint: 'rgba(190, 21, 96, 0.12)', hc: '#8b094a' },
    dark: { fg: '#ff6fae', tint: 'rgba(255, 111, 174, 0.12)', hc: '#f99ac9' },
  },
  vis: {
    label: 'Visualization',
    hue: 'Green',
    light: { fg: '#12752f', tint: 'rgba(18, 117, 47, 0.12)', hc: '#065620' },
    dark: { fg: '#30d158', tint: 'rgba(48, 209, 88, 0.14)', hc: '#6ff69c' },
  },
  ml: {
    label: 'Machine Learning',
    hue: 'Gray',
    light: { fg: '#5c5c66', tint: 'rgba(92, 92, 102, 0.12)', hc: '#4a4a54' },
    dark: { fg: '#adadb8', tint: 'rgba(173, 173, 184, 0.12)', hc: '#c6c6ce' },
  },
};

const FALLBACK = {
  light: { fg: '#5c5c66', tint: 'rgba(92, 92, 102, 0.12)', hc: '#4a4a54' },
  dark: { fg: '#adadb8', tint: 'rgba(173, 173, 184, 0.12)', hc: '#c6c6ce' },
};

export const topicLabel = (key) => (TOPICS[key] ? TOPICS[key].label : key);

export const topicStyle = (key, isLight) => {
  const entry = TOPICS[key] || FALLBACK;
  return isLight ? entry.light : entry.dark;
};

export default TOPICS;
