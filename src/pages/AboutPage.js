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
    content: 'Ph.D Student in Computer Science, 2023-2027 (Expected)',
  },
  {
    title: 'Ulsan National Institute of Science and Technology (UNIST)',
    content: 'M.S in Computer Science and Engineering, 2018-2020',
  },
  {
    title: 'Ulsan National Institute of Science and Technology (UNIST)',
    content: 'B.S in Computer Science and Engineering, 2014-2018',
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

const NewsItems = [
  {
    date: '2026.09',
    content: 'Submitted 3 CHI 2027 papers: 2 first-author on smart glasses, 1 second-author on interactive narrative.',
  },
  {
    date: '2026.08',
    content: 'One paper got accepted: EMNLP 2026 (Main Conference).',
  },
  {
    date: '2026.06',
    content: 'Two papers were conditionally accepted: one to IEEE VIS 2026 and one to ECCV 2026.',
  },
  {
    date: '2026.04',
    content: 'Submitted one paper (Speech Interaction in Sport XR) in IEEE VIS 2026.',
  },
  {
    date: '2026.03',
    content: 'Two papers got accepted at ACM CHI 2026, with one receiving a Best Paper Award!',
  },
  {
    date: '2026.03',
    content: 'Submitted one paper (Human Mesh Recovery and Tracking) in ECCV 2026.',
  },
  {
    date: '2025.06',
    content: 'Gave a seminar talk at Korea University.',
  },
  {
    date: '2025.04',
    content: 'Submitted a paper to ACM UIST 2025.',
  },
  {
    date: '2024.10',
    content: 'Presented "Sportify" at IEEE VIS 2024.',
  },
  {
    date: '2024.03',
    content: 'Submitted a paper to IEEE VIS 2024.',
  },
  {
    date: '2023.09',
    content: 'Started Ph.D. program at Harvard University.',
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
                Hello! I am Chunggi Lee, a PhD student 
                {/* at{' '}
                <Link target="_blank" href="https://vcg.seas.harvard.edu/">
                  Visual Computing Group
                </Link>{' '} */}
                {' '} in <Link target="_blank" href="https://www.harvard.edu/">
                  Harvard University
                </Link>,
                under the supervision of{' '}
                <Link target="_blank" href="https://vcg.seas.harvard.edu/people">
                  Prof. Hanspeter Pfister
                </Link>
                . My research focuses on 
                <Box
                  component="span"
                  sx={{
                    fontWeight: 600,
                    textDecoration: 'underline',
                    textDecorationColor: '#03c2c9',
                    textDecorationThickness: '2px',
                    textUnderlineOffset: '3px',
                  }}
                > Human-Centered Multimodal Interactive AI for Wearable and Immersive Systems. </Box> 
                I study how AI systems can understand people, context, and intent, determine and verify the evidence needed to act, and adapt their interaction to users and situations. 
                My work bridges HCI with computer vision, speech and language, multimodal interaction, and XR, with publications at <Box
                  component="span"
                  sx={{
                    fontWeight: 600,
                    textDecoration: 'underline',
                    textDecorationColor: '#03c2c9',
                    textDecorationThickness: '2px',
                    textUnderlineOffset: '3px',
                  }}
                > CHI, IEEE VIS/TVCG, CVPR, ECCV, and EMNLP. </Box>
                I am particularly interested in starting from problems that emerge in human experience, translating them into technical challenges in AI, and bringing the resulting capabilities back into interactive systems that people can actually use.
                I earned my B.S. and M.S. degrees from the Computer Science department at{' '}
                <Link target="_blank" href="https://www.unist.ac.kr">UNIST</Link>, where I worked with Prof. Sungahn Ko in the{' '}
                <Link target="_blank" href="https://ivader.unist.ac.kr/">iVADER Lab</Link>. Prior to my PhD, I worked as an AI Applied
                Researcher at{' '}
                <Link target="_blank" href="https://webtoonscorp.com/en/">Naver Webtoon</Link> and{' '}
                <Link target="_blank" href="https://lunit.io/">Lunit</Link> as part of my military service.
              </Typography>
              <Typography variant="h6">
                <Box
                  component="span"
                  sx={{
                    fontWeight: 600,
                    textDecoration: 'underline',
                    textDecorationColor: '#03c2c9',
                    textDecorationThickness: '2px',
                    textUnderlineOffset: '3px',

                    animation: 'blink 1.2s ease-in-out infinite',

                    '@keyframes blink': {
                      '0%, 100%': {
                        opacity: 1,
                      },
                      '50%': {
                        opacity: 0.35,
                      },
                    },
                  }}
                > 
                I am currently on the job market and exploring research opportunities for 2027.
                </Box>
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
            
            <Box sx={{ mt: 6 }}>
              <Animate delay={0.6}>
                <Typography variant="h5" gutterBottom>
                  News
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    mt: 1,
                    maxHeight: 160, // 원하는 높이
                    overflowY: 'auto',
                    pr: 1,
                  }}
                >
                  {NewsItems.map((news, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 500, mr: 1, whiteSpace: 'nowrap', minWidth: '70px' }}
                        color="textSecondary"
                      >
                        {news.date}
                      </Typography>
                      <Typography variant="h6">{news.content}</Typography>
                    </Box>
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
