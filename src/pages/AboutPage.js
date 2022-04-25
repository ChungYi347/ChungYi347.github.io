import React, { forwardRef } from 'react';
import { css } from '@emotion/react';
import Title from '../layouts/Title';
import me from '../assets/images/me.png';
import { Typography, Box, Grid, Link } from '@mui/material';
import ExperienceItem from '../components/ExperienceItem';
import Animate from '../components/Animate';

const Educations = [
  {
    title: 'Ulsan National Institute of Science and Technology (UNIST)',
    content: 'M.S in Computer Science and Engineering, 2018~2020',
  },
  {
    title: 'Ulsan National Institute of Science and Technology (UNIST)',
    content: 'B.S in Computer Science and Engineering, 2014~2018',
  },
];

const Experiences = [
  {
    title: 'Lunit',
    content: 'Research Engineer, 2020~ \n (Alternative Military Service)',
  },
  {
    title: 'iVADER Lab',
    content: 'Researcher, 2017~2020',
  },
];

const ProfileText = ({ text, size }) => {
  return (
    <Typography align="center" variant={size}>
      {text}
    </Typography>
  );
};

const AboutPage = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <div css={{ 'margin-top': '60px' }} />
      <Title text={'ABOUT'} width={'12%'} />
      <br />

      <Box
        sx={{
          display: 'flex',

          p: 1,
          m: 1,
          borderRadius: 1,
        }}
      >
        <Grid container style={{ flexDirection: 'row-reverse', justifyContent: 'center' }} spacing={3}>
          <Grid item xs={3} style={{ justifyContent: 'center' }}>
            <Animate delay={0.3}>
              <img
                style={{
                  borderRadius: 10,
                  objectFit: 'cover',
                  objectPosition: '-20% -50%',
                  width: '100%',
                }}
                src={me}
              />
              <ProfileText size={'h4'} text={'Chunggi Lee'} />
              <ProfileText size={'h5'} text={'Lunit'} />
              <ProfileText size={'h5'} text={'Research Engineer'} />
            </Animate>
          </Grid>

          <Grid item lg>
            <Animate delay={0.3}>
              <Typography variant="h5">
                Hello! I am Chunggi Lee, a Research Engineer at{' '}
                <Link target="_blank" href="https://www.lunit.io">
                  Lunit
                </Link>
                . My work is to design and build interactive systems and techniques to gain more high quality pathology
                data and make more accurate deep learning models in cell and tissue. I am also interested in visual
                analytics and human-computer interaction, especially making interactive tools and techniques, and
                data-driven applications with deep learning. I received B.S. and M.S. degrees in the computer science
                department at{' '}
                <Link target="_blank" href="https://www.unist.ac.kr">
                  Ulsan National Institute of Science and Technology (UNIST)
                </Link>
                . I worked with Sungahn Ko in the{' '}
                <Link target="_blank" href="https://ivader.unist.ac.kr/">
                  Interactive Visual Analysis and Data Exploration Research (iVADER) Lab
                </Link>
                .
              </Typography>
            </Animate>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Animate delay={0.6}>
                <Box>
                  <Typography marginTop={2} variant="h4">
                    Education
                  </Typography>
                  {Educations.map((elem) => (
                    <ExperienceItem type={'SCHOOL'} title={elem['title']} content={elem['content']}></ExperienceItem>
                  ))}
                </Box>
              </Animate>
              <Animate delay={0.6}>
                <Box>
                  <Typography marginTop={2} variant="h4">
                    Work Experiences
                  </Typography>
                  {Experiences.map((elem) => (
                    <ExperienceItem type={'COMPANY'} title={elem['title']} content={elem['content']}></ExperienceItem>
                  ))}
                </Box>
              </Animate>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
});

export default AboutPage;
