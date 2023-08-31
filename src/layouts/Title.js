import React from 'react';
import { css } from '@emotion/react';
import Typography from '@mui/material/Typography';
import Animate from '../components/Animate';

const Title = ({ text }) => {
  const width = text === 'ABOUT' ? '16%' : '20%';
  return (
    <Animate>
      <Typography variant="h5" align="center">
        {text}
      </Typography>
      <div
        css={css`
          margin: 0 auto;
          width: ${width};
          height: 3px;
          background: #03c2c9;
        `}
      />
    </Animate>
  );
};

export default Title;
