import React from 'react';
import { Typography, Box } from '@mui/material';

import Animate from '../components/Animate';
import { useThemeContext } from '../contexts/ThemeContext';

/**
 * 섹션 제목.
 *
 * 이전에는 밑줄 너비를 텍스트 길이에 따라 백분율로 넘겨받아, 화면 폭이 바뀌면
 * 글자와 밑줄의 길이가 어긋났다. 인라인 블록으로 감싸 글자 폭에 자연히 맞춘다.
 */
const Title = ({ text, id }) => {
  const { colors } = useThemeContext();

  return (
    <Animate>
      <Box sx={{ textAlign: 'center', mt: { xs: 6, md: 8 }, mb: { xs: 3, md: 4 } }}>
        <Typography
          id={id}
          variant="h4"
          component="h2"
          sx={{ display: 'inline-block', letterSpacing: '0.06em', pb: 1 }}
        >
          {text}
          <Box
            aria-hidden="true"
            sx={{
              mt: 1,
              height: 3,
              borderRadius: 999,
              background: colors.accentBright,
            }}
          />
        </Typography>
      </Box>
    </Animate>
  );
};

export default Title;
