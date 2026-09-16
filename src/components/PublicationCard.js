import React, { useEffect, useRef, useState } from 'react';
import { Card, Typography, Box, Link, Chip } from '@mui/material';
import { useInView } from 'react-intersection-observer';

import Animate from './Animate';
import MediaLightbox from './MediaLightbox';
import { useThemeContext } from '../contexts/ThemeContext';

const ME = 'Chunggi Lee';

// 저자 목록에서 본인 이름만 강조한다
const AuthorLine = ({ author, colors }) => {
  const parts = author.split(ME);

  if (parts.length === 1) {
    return (
      <Typography variant="body2" color="text.secondary">
        {author}
      </Typography>
    );
  }

  return (
    <Typography variant="body2" color="text.secondary">
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <Box
              component="span"
              sx={{
                fontWeight: 650,
                color: colors.label,
                borderBottom: `2px solid ${colors.accentBright}`,
              }}
            >
              {ME}
            </Box>
          )}
        </React.Fragment>
      ))}
    </Typography>
  );
};

const AWARD = 'Best Paper Award';

const ConferenceLine = ({ conference, colors }) => {
  if (!conference.includes(AWARD)) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
        {conference}
      </Typography>
    );
  }

  const [before, after] = conference.split(AWARD);
  return (
    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
      {before}
      <Box
        component="span"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          color: colors.accent,
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}
      >
        {/* 색만으로 구분하지 않도록 아이콘을 함께 둔다 (HIG: Inclusive color) */}
        <span aria-hidden="true">🏆</span>
        {AWARD}
      </Box>
      {after}
    </Typography>
  );
};

/**
 * 논문 썸네일.
 *
 * 애니메이션 썸네일은 GIF 대신 MP4 로 제공한다(용량 1/8 수준). 화면에 들어올 때만
 * 재생하고, 모션 최소화 설정에서는 포스터 정지 이미지만 보여준다
 * (WCAG 2.2.2: 5초 이상 자동 재생되는 움직임은 멈출 수 있어야 한다).
 */
const PlayGlyph = ({ playing }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="18" height="18">
    {playing ? (
      <path d="M8 5h3v14H8zM13 5h3v14h-3z" />
    ) : (
      <path d="M8 5.2v13.6a.6.6 0 0 0 .92.5l10.6-6.8a.6.6 0 0 0 0-1l-10.6-6.8A.6.6 0 0 0 8 5.2z" />
    )}
  </svg>
);

const ExpandGlyph = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    width="22"
    height="22"
  >
    <path d="M9 3H4.5A1.5 1.5 0 0 0 3 4.5V9M15 3h4.5A1.5 1.5 0 0 1 21 4.5V9M9 21H4.5A1.5 1.5 0 0 1 3 19.5V15M15 21h4.5a1.5 1.5 0 0 0 1.5-1.5V15" />
  </svg>
);

/*
  썸네일 위에 뜨는 유리 컨트롤들의 공통 스타일.
  HIG(Materials)가 허용하는 "콘텐츠 레이어의 일시적 인터랙티브 요소" 케이스다.
*/
const glassControl = (colors) => ({
  position: 'absolute',
  width: 34,
  height: 34,
  display: 'grid',
  placeItems: 'center',
  border: `1px solid ${colors.glassBorder}`,
  borderRadius: 999,
  cursor: 'pointer',
  color: colors.label,
  backgroundColor: colors.glass,
  backdropFilter: 'saturate(180%) blur(14px)',
  WebkitBackdropFilter: 'saturate(180%) blur(14px)',
  boxShadow: `inset 0 1px 0 ${colors.glassSpecular}, 0 2px 10px rgba(0,0,0,.25)`,
  opacity: 0,
  transform: 'scale(0.86)',
  transition: 'opacity .2s ease, transform .2s ease',
  '&:focus-visible': { opacity: 1, transform: 'scale(1)' },
  '@media (prefers-reduced-transparency: reduce)': {
    backdropFilter: 'none',
    WebkitBackdropFilter: 'none',
    backgroundColor: colors.glassOpaque,
  },
  // 터치 기기는 hover 가 없으므로 항상 보이게 둔다
  '@media (hover: none)': { opacity: 1, transform: 'scale(1)' },
});

const Thumbnail = ({ media, poster, title, onExpand }) => {
  const { colors } = useThemeContext();
  const videoRef = useRef(null);
  const [ref, inView] = useInView({ rootMargin: '200px 0px' });
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mql.matches);
    apply();
    if (mql.addEventListener) mql.addEventListener('change', apply);
    else mql.addListener(apply);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', apply);
      else mql.removeListener(apply);
    };
  }, []);

  // 화면 밖에서는 재생을 멈춰 배터리와 CPU 를 아낀다.
  // 사용자가 직접 일시정지했다면 화면에 다시 들어와도 그 의사를 존중한다.
  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;
    if (inView && !reduced && !paused) {
      const p = node.play();
      if (p && p.catch) p.catch(() => {});
    } else {
      node.pause();
    }
  }, [inView, reduced, paused]);

  const isVideo = typeof media === 'string' && /\.(mp4|webm)(\?|$)/.test(media);

  /*
    고정 비율 프레임에 contain 으로 맞추면, figure 비율이 제각각이라 위아래로
    빈 흰 띠가 생기고 테두리만 덩그러니 남는다. 대신 폭만 정하고 높이는 이미지
    고유 비율을 따르게 한다. 지나치게 세로로 긴 figure 만 maxHeight 로 제한한다.
  */
  const frame = {
    width: { xs: '100%', md: 260 },
    flexShrink: 0,
    height: 'auto',
    maxHeight: { xs: 260, md: 200 },
    objectFit: 'contain',
    objectPosition: 'top left',
    /*
      바깥 카드(16px)보다 덜 둥글어야 한다. 자식이 부모보다 더 둥글면
      모서리가 어긋나 보인다 (Apple: 중첩 요소는 동심 반경을 따를 것).
      카드 반경 16 - 패딩 20 은 음수라 사실상 각지는 게 맞지만,
      완전히 각지면 딱딱해 보여 10px 로 둔다.
    */
    borderRadius: '10px',
    display: 'block',
    alignSelf: 'flex-start',
  };

  /*
    확대 버튼 = 썸네일 전체를 덮는 유리 오버레이.

    처음에는 모서리에 34px 알약으로 뒀는데 너무 작아 눈에 띄지 않았다.
    프로젝트 카드의 hover 와 같은 방식으로 맞추면 발견하기 쉽고 사이트 전체의
    상호작용 언어도 일관된다.

    재생 버튼과 '형제'로 둔다 — 버튼 안에 버튼을 넣으면 유효하지 않은
    마크업이고 키보드/스크린리더 동작도 깨진다.
  */
  const expandButton = (
    <Box
      component="button"
      type="button"
      className="vctl-overlay"
      onClick={onExpand}
      aria-label={`Enlarge figure from "${title}"`}
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.75,
        border: 'none',
        borderRadius: 'inherit',
        cursor: 'pointer',
        color: '#fff',
        font: 'inherit',
        // 그림 위에 잠깐 떠오르는 층 — HIG 가 허용하는 transient 케이스
        background: 'rgba(0, 24, 25, 0.58)',
        backdropFilter: 'blur(7px) saturate(140%)',
        WebkitBackdropFilter: 'blur(7px) saturate(140%)',
        opacity: 0,
        transition: 'opacity 0.28s ease',
        '&:focus-visible': { opacity: 1 },
        '@media (prefers-reduced-transparency: reduce)': {
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          background: 'rgba(0, 24, 25, 0.9)',
        },
        /*
          터치 기기에는 hover 가 없다. 오버레이를 계속 띄워두면 그림이 늘 가려지므로,
          배경은 걷어내고 모서리에 작은 유리 알약만 남긴다. 그림은 또렷하게 보이면서
          누를 수 있다는 신호는 유지된다.
        */
        '@media (hover: none)': {
          opacity: 1,
          background: 'transparent',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          padding: '8px',
          gap: 0,
          '& > svg': { display: 'none' },
        },
      }}
    >
      <ExpandGlyph />
      <Box
        component="span"
        sx={{
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: colors.accentBright,
          '@media (hover: none)': {
            // 터치에서는 라벨 자체가 유리 알약이 된다
            color: colors.label,
            padding: '5px 10px',
            borderRadius: 999,
            border: `1px solid ${colors.glassBorder}`,
            backgroundColor: colors.glass,
            backdropFilter: 'saturate(180%) blur(14px)',
            WebkitBackdropFilter: 'saturate(180%) blur(14px)',
            boxShadow: `inset 0 1px 0 ${colors.glassSpecular}, 0 2px 10px rgba(0,0,0,.25)`,
          },
        }}
      >
        ENLARGE →
      </Box>
    </Box>
  );

  if (!isVideo) {
    return (
      <Box
        ref={ref}
        sx={{
          ...frame,
          position: 'relative',
          overflow: 'hidden',
          '&:hover .vctl, &:focus-within .vctl': { opacity: 1, transform: 'scale(1)' },
          '&:hover .vctl-overlay, &:focus-within .vctl-overlay': { opacity: 1 },
        }}
      >
        <Box
          component="img"
          src={media}
          alt={`Figure from "${title}"`}
          loading="lazy"
          decoding="async"
          sx={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'top left', display: 'block' }}
        />
        {expandButton}
      </Box>
    );
  }

  // useInView 의 ref 와 <video> 제어용 ref 를 같은 노드에 연결한다
  const setRefs = (node) => {
    videoRef.current = node;
    ref(node);
  };

  /*
    재생/일시정지 버튼.

    HIG(Materials)는 Liquid Glass 를 콘텐츠 레이어에 쓰지 말라고 하면서, 한 가지
    예외를 둔다 — "콘텐츠 레이어의 컨트롤 중 일시적(transient) 인터랙티브 요소는
    상호작용성을 강조하기 위해 Liquid Glass 외형을 띤다". 영상 위에 잠깐 떠오르는
    이 버튼이 정확히 그 경우다.

    동시에 WCAG 2.2.2(5초 이상 자동 재생되는 움직임은 멈출 수 있어야 한다)도
    충족한다. 이전에는 모션 최소화 설정을 켠 사용자만 정지할 수 있었다.
  */
  return (
    <Box
      sx={{
        ...frame,
        position: 'relative',
        overflow: 'hidden',
        '&:hover .vctl, &:focus-within .vctl': { opacity: 1, transform: 'scale(1)' },
        '&:hover .vctl-overlay, &:focus-within .vctl-overlay': { opacity: 1 },
      }}
    >
      <Box
        ref={setRefs}
        component="video"
        sx={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
        poster={poster}
        preload="none"
        muted
        loop
        playsInline
        aria-label={`Animated figure from "${title}"`}
      >
        <source src={media} type="video/mp4" />
      </Box>

      <Box
        component="button"
        type="button"
        className="vctl"
        onClick={() => setPaused((v) => !v)}
        aria-label={paused ? `Play animation for "${title}"` : `Pause animation for "${title}"`}
        sx={{
          ...glassControl(colors),
          left: 8,
          bottom: 8,
          // 오버레이(zIndex 1)보다 위에 있어야 클릭이 확대로 새지 않는다
          zIndex: 2,
          // 모션 최소화 설정이면 자동 재생이 안 되므로 버튼을 계속 노출한다
          '@media (prefers-reduced-motion: reduce)': { opacity: 1, transform: 'scale(1)' },
        }}
      >
        <PlayGlyph playing={!paused && !reduced} />
      </Box>

      {expandButton}
    </Box>
  );
};

const PublicationCard = ({ media, poster, title, author, conference, tags }) => {
  const { colors } = useThemeContext();
  const [zoomed, setZoomed] = useState(false);

  return (
    <Animate>
      <Card
        component="article"
        sx={{
          width: '100%',
          my: 1.5,
          p: { xs: 2, md: 2.5 },
          display: 'flex',
          gap: { xs: 2, md: 3 },
          flexDirection: { xs: 'column', md: 'row' },
          backgroundColor: 'background.paper',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          '&:hover': { transform: 'translateY(-2px)', boxShadow: colors.shadowStrong },
          '@media (prefers-reduced-motion: reduce)': {
            '&:hover': { transform: 'none' },
          },
        }}
      >
        <Thumbnail media={media} poster={poster} title={title} onExpand={() => setZoomed(true)} />

        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h6" color="text.primary" sx={{ fontWeight: 650 }}>
            {title}
          </Typography>

          <Box sx={{ mt: 0.75 }}>
            <AuthorLine author={author} colors={colors} />
            <ConferenceLine conference={conference} colors={colors} />
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1.5 }}>
            {tags.map((tag) => (
              <Chip
                key={tag.link || tag.tag}
                component={Link}
                href={tag.link}
                target="_blank"
                rel="noopener noreferrer"
                clickable
                size="small"
                label={tag.tag.replace(/[[\]]/g, '')}
                sx={{
                  fontWeight: 600,
                  color: colors.accent,
                  backgroundColor: colors.accentSoft,
                  '&:hover': { backgroundColor: colors.accentSoft, filter: 'brightness(1.1)' },
                }}
              />
            ))}
          </Box>
        </Box>
      </Card>

      <MediaLightbox open={zoomed} onClose={() => setZoomed(false)} media={media} poster={poster} title={title} />
    </Animate>
  );
};

export default PublicationCard;
