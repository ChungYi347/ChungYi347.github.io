import React, { useState, forwardRef } from 'react';
import { css } from '@emotion/react';
import Title from '../layouts/Title';
import { Paper, Box, Grid } from '@mui/material';

import Animate from '../components/Animate';
import DetailModal from '../components/Modal';
import { useThemeContext } from '../contexts/ThemeContext';

import ProjectCard from '../components/ProjectCard';
import projs from '../data/projects';

const ProjectPage = forwardRef((props, ref) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const { open, setOpen } = useThemeContext();

  return (
    <div ref={ref}>
      <Title text={'PROJECTS'} width={'12%'} />
      <br />
      <Grid
        sx={{
          display: 'flex',
          flexDirection: { xs: 'row', sm: 'row' },
          p: 1,
          // m: 1,
          borderRadius: 1,
          flexWrap: 'wrap',
        }}
        container
        spacing={1}
      >
        {projs.map((elem, i) => {
          const delay = parseInt(i / 2) * 0.2;

          return (
            <Grid item xs={6} sm={3} md={3}>
              <Animate delay={delay}>
                <ProjectCard
                  media={elem['image']}
                  title={elem['title']}
                  setOpen={setOpen}
                  idx={i}
                  setSelectedIdx={setSelectedIdx}
                />
              </Animate>
            </Grid>
          );
        })}
        <DetailModal
          open={open}
          setOpen={setOpen}
          title={projs[selectedIdx]['title']}
          img={projs[selectedIdx]['image']}
          content={projs[selectedIdx]['content']}
          tags={projs[selectedIdx]['tags']}
        />
      </Grid>
    </div>
  );
});

export default ProjectPage;
