import React from 'react';
import { Modal, Fade, Backdrop, Box, Typography, IconButton, Chip, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useThemeContext } from '../contexts/ThemeContext';

/**
 * 프로젝트 상세 시트.
 *
 * MUI Modal 이 포커스 트랩과 Esc 닫기를 처리하지만, 닫기 버튼이 없어
 * 터치 기기에서 배경을 정확히 눌러야만 닫을 수 있었다. 명시적 버튼을 추가한다.
 */
export default function DetailModal({ open, setOpen, title, img, content, tags = [] }) {
  const { colors } = useThemeContext();
  const handleClose = () => setOpen(false);

  // MUI 5.6 에서는 slotProps 가 무시된다 — BackdropComponent/BackdropProps 를 써야 한다
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      aria-labelledby="project-modal-title"
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          backdropFilter: 'blur(10px) saturate(140%)',
          WebkitBackdropFilter: 'blur(10px) saturate(140%)',
          '@media (prefers-reduced-transparency: reduce)': {
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
            width: { xs: 'calc(100% - 32px)', md: 'min(820px, 90vw)' },
            maxHeight: { xs: '88vh', md: '85vh' },
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            // 떠 있는 시트이므로 유리 재질 + 윗면 반사광
            backgroundColor: colors.glass,
            backdropFilter: 'saturate(190%) blur(28px)',
            WebkitBackdropFilter: 'saturate(190%) blur(28px)',
            border: `1px solid ${colors.glassBorder}`,
            borderRadius: '28px',
            boxShadow: `inset 0 1px 0 ${colors.glassSpecular}, ${colors.shadowStrong}`,
            '@media (prefers-reduced-transparency: reduce)': {
              backdropFilter: 'none',
              WebkitBackdropFilter: 'none',
              backgroundColor: 'background.paper',
            },
            p: { xs: 2.5, md: 4 },
            outline: 'none',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
            <Typography id="project-modal-title" variant="h5" sx={{ flex: 1 }}>
              {title}
            </Typography>
            <IconButton onClick={handleClose} aria-label="닫기" sx={{ mt: -0.5, mr: -0.5 }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            component="img"
            src={img}
            alt={title}
            loading="lazy"
            decoding="async"
            sx={{ width: '100%', borderRadius: 2, display: 'block', mb: 3 }}
          />

          <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
            Abstract
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
            {content}
          </Typography>

          {tags.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3 }}>
              {tags.map((tag) => (
                <Chip
                  key={tag.link || tag.tag}
                  component={Link}
                  href={tag.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  clickable
                  label={tag.tag.replace(/[[\]]/g, '')}
                  sx={{ fontWeight: 600, color: colors.accent, backgroundColor: colors.accentSoft }}
                />
              ))}
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );
}
