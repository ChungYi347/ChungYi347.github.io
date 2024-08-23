import React, { forwardRef } from 'react';
import { css } from '@emotion/react';
import Title from '../layouts/Title';
import me from '../assets/images/me.png';
import { Typography, Box, Grid, Link } from '@mui/material';
import ExperienceItem from '../components/ExperienceItem';
import Animate from '../components/Animate';

const Educations = [
  {
    title: 'Harvard University',
    content: 'Ph.D Student in Computer Science, 2023~Now',
  },
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
    title: 'Naver Webtoon',
    // content: 'AI Applied Researcher, 2022~ \n (Alternative Military Service)',
    content: 'AI Applied Researcher, 2022~2023',
  },
  {
    title: 'Lunit',
    // content: 'Research Engineer, 2020~2022 \n (Alternative Military Service)',
    content: 'Research Engineer, 2020~2022',
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
      <div css={{ 'margin-top': '80px' }} />
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
              <ProfileText size={'h5'} text={'Chunggi Lee'} />
              <ProfileText size={'h6'} text={'Harvard University'} />
              <ProfileText size={'h6'} text={'PhD Student'} />
            </Animate>
          </Grid>

          <Grid item lg>
            <Animate delay={0.3}>
              <Typography variant="h6">
                Hello! I am Chunggi Lee, a PhD student at{' '}
                <Link target="_blank" href="https://vcg.seas.harvard.edu/">
                  Visual Computing Group
                </Link>{' '}
                in Harvard University with{' '}
                <Link target="_blank" href="https://www.harvard.edu/">
                  Prof. Hanspeter Pfister
                </Link>
                .{' '}
                {/* My work is not only to understand the process of webtoon creation, but also to help the users to */}
                {/* enhance their ability effectively by building a Human AI Interaction (HAI) through deep learning.  */}
                My research explores the intersection of Human-Computer Interaction (HCI), Visualization, and Computer
                Vision. My primary goal is to transform real-world environments into immersive AR/VR experiences,
                focusing on developing innovative applications and techniques. This work enhances user interaction and
                engagement by leveraging computer vision techniques. I earned my B.S. and M.S. degrees from the Computer
                Science department at{' '}
                <Link target="_blank" href="https://www.unist.ac.kr">
                  UNIST
                </Link>
                , where I worked with Prof. Sungahn Ko in the{' '}
                <Link target="_blank" href="https://ivader.unist.ac.kr/">
                  iVADER Lab
                </Link>
                . Prior to my PhD, I worked as an AI Applied Researcher at{' '}
                <Link target="_blank" href="https://webtoonscorp.com/en/">
                  Naver Webtoon
                </Link>{' '}
                and{' '}
                <Link target="_blank" href="https://lunit.io/">
                  Lunit
                </Link>{' '}
                as part of my military service.
              </Typography>
            </Animate>
            <Box
              sx={{
                mt: '20px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Animate delay={0.6}>
                <Box>
                  <Typography marginTop={2} variant="h5">
                    Education
                  </Typography>
                  {Educations.map((elem) => (
                    <ExperienceItem type={'SCHOOL'} title={elem['title']} content={elem['content']}></ExperienceItem>
                  ))}
                </Box>
              </Animate>
              <Animate delay={0.6}>
                <Box>
                  <Typography marginTop={2} variant="h5">
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
