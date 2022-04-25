import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useThemeContext } from '../contexts/ThemeContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '90%',
    md: '70%',
  },
  // bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: {
    xs: 2,
    md: 4,
  },
  overflowY: 'scroll',
  height: '100%',
  // display: 'block',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

export default function DetailModal({ open, setOpen, title, img, content, tags }) {
  const { isLight } = useThemeContext();

  const handleClose = () => {
    console.log(open);
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => handleClose()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} bgcolor={isLight ? 'white' : '#525252'}>
            <Typography id="transition-modal-title" variant="h4" align="center">
              {title}
            </Typography>

            <Box
              component="img"
              sx={{
                width: {
                  xs: '100%', //img src from xs up to md
                  md: '80%', //img src from md and up
                },
              }}
              src={img}
              alt={title}
              loading="lazy"
            />

            <Typography id="transition-modal-description" variant="h5" align="center">
              {'Abstract'}
            </Typography>
            <Typography id="transition-modal-description" variant="h6" sx={{ mt: 2 }}>
              {content}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
              {tags.map((elem) => (
                <Typography
                  marginLeft={1}
                  component="a"
                  href={elem['link']}
                  color={'#03c2c9'}
                  variant="h5"
                  align="center"
                >
                  {elem['tag']}
                </Typography>
              ))}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
