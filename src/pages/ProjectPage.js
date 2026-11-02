import React, { useState, forwardRef } from 'react';
import { Grid } from '@mui/material';

import Title from '../layouts/Title';
import Animate from '../components/Animate';
import DetailModal from '../components/Modal';
import ProjectCard from '../components/ProjectCard';
import projs from '../data/projects';

const ProjectPage = forwardRef((props, ref) => {
  const [selectedIdx, setSelectedIdx] = useState(null);

  const selected = selectedIdx === null ? null : projs[selectedIdx];

  return (
    <section ref={ref} data-section aria-labelledby="projects-title">
      <Title id="projects-title" text={'PROJECTS'} />

      <Grid container spacing={2}>
        {projs.map((proj, i) => (
          <Grid item xs={6} sm={4} md={3} key={proj.title}>
            {/* 행 단위로 지연시켜 순차적으로 나타나게 한다 */}
            <Animate delay={Math.floor(i / 4) * 0.12}>
              <ProjectCard media={proj.image} title={proj.title} onOpen={() => setSelectedIdx(i)} />
            </Animate>
          </Grid>
        ))}
      </Grid>

      {selected && (
        <DetailModal
          open={selectedIdx !== null}
          setOpen={(v) => !v && setSelectedIdx(null)}
          title={selected.title}
          img={selected.image}
          content={selected.content}
          tags={selected.tags}
        />
      )}
    </section>
  );
});

ProjectPage.displayName = 'ProjectPage';

export default ProjectPage;
