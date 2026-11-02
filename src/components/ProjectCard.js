import React from 'react';
import { Card, CardActionArea, Typography, Box } from '@mui/material';

import { useThemeContext } from '../contexts/ThemeContext';

/**
 * 프로젝트 썸네일 카드.
 *
 * 이전에는 높이가 20vh 로 고정돼 뷰포트 비율에 따라 이미지가 찌그러졌고,
 * [Detail] 텍스트에 onClick 을 달아 키보드로 열 수 없었다.
 * aspect-ratio 로 비율을 고정하고 CardActionArea(=button) 로 교체한다.
 */
const ProjectCard = ({ media, title, onOpen }) => {
  const { colors } = useThemeContext();

  return (
    <Card sx={{ width: '100%', overflow: 'hidden' }}>
      <CardActionArea
        onClick={onOpen}
        aria-label={`${title} 자세히 보기`}
        sx={{
          position: 'relative',
          display: 'block',
          aspectRatio: '4 / 3',
          '&:hover .overlay, &:focus-visible .overlay': { opacity: 1 },
        }}
      >
        <Box
          component="img"
          src={media}
          alt={title}
          loading="lazy"
          decoding="async"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            // figure 는 보통 위쪽에 핵심이 있으므로 상단 기준으로 자른다
            objectPosition: 'top center',
            display: 'block',
          }}
        />

        <Box
          className="overlay"
          sx={{
            position: 'absolute',
            inset: 0,
            px: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            textAlign: 'center',
            color: '#fff',
            /* 이미지 위에 뜨는 반투명 레이어이므로 유리 재질이 적절한 자리다 */
            background: 'rgba(0, 24, 25, 0.62)',
            WebkitBackdropFilter: 'blur(8px) saturate(140%)',
            backdropFilter: 'blur(8px) saturate(140%)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            '@media (prefers-reduced-transparency: reduce)': {
              WebkitBackdropFilter: 'none',
              backdropFilter: 'none',
              background: 'rgba(0, 24, 25, 0.92)',
            },
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 650, lineHeight: 1.35 }}>
            {title}
          </Typography>
          <Typography variant="caption" sx={{ color: colors.accent, fontWeight: 700, letterSpacing: '0.06em' }}>
            DETAIL →
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default ProjectCard;
