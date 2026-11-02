import React, { useEffect, useState } from 'react';
import { Modal, Fade, Backdrop, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useThemeContext } from '../contexts/ThemeContext';

/*
  논문 figure 확대 보기.

  카드 안 썸네일은 260px 라 figure 에 들어있는 글자를 읽을 수 없다. 논문 목록에서
  사람들이 실제로 하고 싶은 일(이 논문이 뭘 하는 건지 그림으로 파악하기)이 막혀 있었다.

  원본보다 크게 늘리지는 않는다. 확대해서 뭉개 보여주는 건 도움이 안 되므로
  미디어의 고유 해상도를 상한으로 둔다.
*/
// 미디어별 고유 해상도 캐시 — 한 번 재면 바뀌지 않는다
const naturalCache = {};

const MediaLightbox = ({ open, onClose, media, poster, title }) => {
  const { colors } = useThemeContext();
  const [natural, setNatural] = useState(() => naturalCache[media] || null);
  const isVideo = typeof media === 'string' && /\.(mp4|webm)(\?|$)/.test(media);

  /*
    열릴 때 고유 해상도를 미리 잰다.

    이전에는 <img onLoad> 로 잰 뒤 크기를 조정했는데 두 가지 문제가 있었다.
      1) 처음엔 기본값(900px)으로 그려졌다가 실측 후 줄어들어 한 번 덜컥였다
      2) 닫을 때 natural 을 null 로 되돌려서, 페이드아웃 도중 900px 로
         다시 커지는 게 보였다
    미디어는 썸네일에서 이미 받아둔 상태라 이 측정은 캐시에서 즉시 끝난다.
    닫을 때는 아무것도 되돌리지 않는다.
  */
  useEffect(() => {
    if (!open) return undefined;

    const cached = naturalCache[media];
    if (cached) {
      setNatural(cached);
      return undefined;
    }

    let alive = true;
    const remember = (w) => {
      if (!w || !alive) return;
      naturalCache[media] = w;
      setNatural(w);
    };

    if (isVideo) {
      const v = document.createElement('video');
      v.preload = 'metadata';
      v.onloadedmetadata = () => remember(v.videoWidth);
      v.src = media;
      return () => {
        alive = false;
        v.src = '';
      };
    }

    const img = new Image();
    img.onload = () => remember(img.naturalWidth);
    img.src = media;
    return () => {
      alive = false;
    };
  }, [open, media, isVideo]);

  /*
    고유 해상도를 절대 넘기지 않는다. 원본이 256px 인 그림을 320px 로 늘리면
    선명해지는 게 아니라 뭉개질 뿐이다. 작게라도 또렷한 쪽을 택한다.
  */
  const cap = natural ? `min(92vw, ${natural}px)` : 'min(92vw, 900px)';

  /*
    MUI 5.6 의 Modal 은 slots/slotProps 를 지원하지 않는다 — 그 API 는 이후 버전에서
    추가됐다. 이 버전에서는 BackdropComponent/BackdropProps 를 써야 실제로 적용된다.
  */
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      aria-labelledby="figure-lightbox-title"
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 260,
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.55)',
          backdropFilter: 'blur(16px) saturate(140%)',
          WebkitBackdropFilter: 'blur(16px) saturate(140%)',
          '@media (prefers-reduced-transparency: reduce)': {
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none',
            backgroundColor: 'rgba(0, 0, 0, 0.88)',
          },
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: cap,
            maxHeight: '88vh',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            outline: 'none',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <Typography id="figure-lightbox-title" variant="body1" sx={{ flex: 1, color: '#fff', fontWeight: 600 }}>
              {title}
            </Typography>
            <IconButton onClick={onClose} aria-label="닫기" sx={{ color: '#fff', mt: -1, mr: -1 }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              borderRadius: '20px',
              overflow: 'hidden',
              backgroundColor: '#fff',
              boxShadow: colors.shadowStrong,
              minHeight: 0,
            }}
          >
            {isVideo ? (
              <Box
                component="video"
                src={media}
                poster={poster}
                autoPlay
                muted
                loop
                playsInline
                controls
                onLoadedMetadata={(e) => setNatural((prev) => prev || e.currentTarget.videoWidth)}
                sx={{ width: '100%', height: 'auto', maxHeight: '78vh', display: 'block' }}
              />
            ) : (
              <Box
                component="img"
                src={media}
                alt={`Figure from "${title}"`}
                onLoad={(e) => setNatural((prev) => prev || e.currentTarget.naturalWidth)}
                sx={{ width: '100%', height: 'auto', maxHeight: '78vh', objectFit: 'contain', display: 'block' }}
              />
            )}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default MediaLightbox;
