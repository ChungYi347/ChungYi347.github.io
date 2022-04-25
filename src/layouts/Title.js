import React from 'react';
import { css } from '@emotion/react';
import Typography from '@mui/material/Typography';
import Animate from '../components/Animate';

const Title = ({ text }) => {
  const width = text === 'ABOUT' ? '24%' : '30%';
  return (
    <Animate>
      <Typography variant="h4" align="center">
        {text}
      </Typography>
      <div
        css={css`
          margin: 0 auto;
          width: ${width};
          height: 5px;
          background: #03c2c9;
        `}
      />
    </Animate>
  );
};

export default Title;
