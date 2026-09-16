import React, { forwardRef, useState } from 'react';
import { Typography, Box, Grid, Link, Button } from '@mui/material';

import Title from '../layouts/Title';
import ExperienceItem from '../components/ExperienceItem';
import Animate from '../components/Animate';
import { useThemeContext } from '../contexts/ThemeContext';
import me from '../assets/images/me.webp';

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
    content: 'AI Applied Researcher, 2022~2023',
  },
  {
    title: 'Lunit',
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
  { date: '2026.08', content: 'One paper got accepted: EMNLP 2026 (Main Conference).' },
  { date: '2026.06', content: 'Two papers were conditionally accepted: one to IEEE VIS 2026 and one to ECCV 2026.' },
  { date: '2026.04', content: 'Submitted one paper (Speech Interaction in Sport XR) in IEEE VIS 2026.' },
  { date: '2026.03', content: 'Two papers got accepted at ACM CHI 2026, with one receiving a Best Paper Award!' },
  { date: '2026.03', content: 'Submitted one paper (Human Mesh Recovery and Tracking) in ECCV 2026.' },
  { date: '2025.06', content: 'Gave a seminar talk at Korea University.' },
  { date: '2025.04', content: 'Submitted a paper to ACM UIST 2025.' },
  { date: '2024.10', content: 'Presented "Sportify" at IEEE VIS 2024.' },
  { date: '2024.03', content: 'Submitted a paper to IEEE VIS 2024.' },
  { date: '2023.09', content: 'Started Ph.D. program at Harvard University.' },
];

const NEWS_PREVIEW = 4;

const Highlight = ({ children, colors }) => (
  <Box
    component="span"
    sx={{
      fontWeight: 650,
      textDecoration: 'underline',
      textDecorationColor: colors.accentBright,
      textDecorationThickness: '2px',
      textUnderlineOffset: '3px',
    }}
  >
    {children}
  </Box>
);

const News = () => {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? NewsItems : NewsItems.slice(0, NEWS_PREVIEW);

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h5" component="h3" gutterBottom>
        News
      </Typography>

      {/*
        이전에는 높이 160px 박스 안에서 내부 스크롤을 했다. 모바일에서 중첩 스크롤은
        잡기 어려우므로 기본 4개만 보여주고 펼치기 버튼을 둔다.
      */}
      <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
        {visible.map((news, idx) => (
          <Box
            component="li"
            key={`${news.date}-${idx}`}
            sx={{ display: 'flex', gap: 1.5, alignItems: 'baseline', mb: 1 }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ whiteSpace: 'nowrap', minWidth: '4.5rem', fontVariantNumeric: 'tabular-nums' }}
            >
              {news.date}
            </Typography>
            <Typography variant="body2">{news.content}</Typography>
          </Box>
        ))}
      </Box>

      {NewsItems.length > NEWS_PREVIEW && (
        <Button size="small" onClick={() => setExpanded((v) => !v)} sx={{ mt: 1, px: 1 }}>
          {expanded ? '← Show less' : `Show all ${NewsItems.length} updates →`}
        </Button>
      )}
    </Box>
  );
};

const AboutPage = forwardRef((props, ref) => {
  const { colors } = useThemeContext();

  return (
    <section ref={ref} data-section aria-labelledby="about-title">
      <Title id="about-title" text={'ABOUT'} />

      <Grid container spacing={{ xs: 3, md: 5 }} sx={{ flexDirection: { xs: 'column', md: 'row-reverse' } }}>
        {/* 프로필 — 모바일에서는 전체 폭 대신 가운데 정렬된 고정 크기로 둔다 */}
        <Grid item xs={12} md={3}>
          <Animate>
            <Box sx={{ maxWidth: { xs: 200, md: 'none' }, mx: 'auto', textAlign: 'center' }}>
              <Box
                component="img"
                src={me}
                alt="Portrait of Chunggi Lee"
                width="540"
                height="618"
                sx={{
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '10 / 11',
                  objectFit: 'cover',
                  borderRadius: 3,
                  display: 'block',
                  boxShadow: colors.shadow,
                }}
              />
              <Typography variant="h6" component="p" sx={{ mt: 1.5 }}>
                Chunggi Lee
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Harvard University
              </Typography>
              <Typography variant="body2" color="text.secondary">
                PhD Student
              </Typography>
            </Box>
          </Animate>
        </Grid>

        <Grid item xs={12} md>
          <Animate>
            {/*
              구직 상태 배지 — 눈에 확 띄어야 하므로 세 가지를 겹쳐 쓴다.
                1) 살아있는 점(live dot): 신호처럼 퍼지는 링
                2) 유리 표면을 훑는 스페큘러 스윕
                3) 테두리 발광의 호흡
              글자 자체의 불투명도는 건드리지 않아 읽는 도중 끊기지 않는다.
              모션 최소화 설정에서는 전부 멈추고 정적인 강조 상태로 고정한다.
            */}
            <Box
              sx={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.25,
                mb: 2.5,
                py: 1,
                pl: 1.75,
                pr: 2.25,
                borderRadius: 999,
                overflow: 'hidden',
                fontWeight: 650,
                fontSize: '0.9375rem',
                lineHeight: 1.4,
                color: colors.accent,
                backgroundColor: colors.accentSoft,
                border: `1.5px solid ${colors.accent}`,
                boxShadow: `inset 0 1px 0 ${colors.glassSpecular}`,
                animation: 'jobGlow 2.4s ease-in-out infinite',

                '@keyframes jobGlow': {
                  '0%, 100%': { boxShadow: `inset 0 1px 0 ${colors.glassSpecular}, 0 0 0 0 ${colors.accentSoft}` },
                  '50%': { boxShadow: `inset 0 1px 0 ${colors.glassSpecular}, 0 0 0 7px ${colors.accentSoft}` },
                },

                // 표면을 훑고 지나가는 빛
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 'inherit',
                  pointerEvents: 'none',
                  background: `linear-gradient(105deg, transparent 35%, ${colors.glassSpecular} 48%, transparent 62%)`,
                  backgroundSize: '260% 100%',
                  animation: 'jobSweep 2.4s ease-in-out infinite',
                  mixBlendMode: colors.glassSweepBlend,
                },
                '@keyframes jobSweep': {
                  '0%, 55%': { backgroundPosition: '170% 0' },
                  '100%': { backgroundPosition: '-70% 0' },
                },

                '@media (prefers-reduced-motion: reduce)': {
                  animation: 'none',
                  boxShadow: `inset 0 1px 0 ${colors.glassSpecular}, 0 0 0 4px ${colors.accentSoft}`,
                  '&::after': { animation: 'none', background: 'none' },
                },
              }}
            >
              {/* 살아있는 신호를 나타내는 점 — 바깥 링이 퍼져나간다 */}
              <Box
                aria-hidden="true"
                sx={{
                  position: 'relative',
                  flexShrink: 0,
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  backgroundColor: colors.accent,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: `2px solid ${colors.accent}`,
                    animation: 'jobPing 2.4s cubic-bezier(0, 0, 0.2, 1) infinite',
                  },
                  '@keyframes jobPing': {
                    '0%': { transform: 'scale(1)', opacity: 0.9 },
                    '70%, 100%': { transform: 'scale(3.2)', opacity: 0 },
                  },
                  '@media (prefers-reduced-motion: reduce)': {
                    '&::before': { animation: 'none', opacity: 0.5 },
                  },
                }}
              />
              On the job market — seeking research opportunities for 2027
            </Box>

            <Typography variant="body1" component="p">
              Hello! I am Chunggi Lee, a PhD student in{' '}
              <Link target="_blank" rel="noopener noreferrer" href="https://www.harvard.edu/">
                Harvard University
              </Link>
              , under the supervision of{' '}
              <Link target="_blank" rel="noopener noreferrer" href="https://vcg.seas.harvard.edu/people">
                Prof. Hanspeter Pfister
              </Link>
              . My research focuses on{' '}
              <Highlight colors={colors}>
                Human-Centered Multimodal Interactive AI for Wearable and Immersive Systems.
              </Highlight>{' '}
              I study how AI systems can understand people, context, and intent, determine and verify the evidence
              needed to act, and adapt their interaction to users and situations. My work bridges HCI with computer
              vision, speech and language, multimodal interaction, and XR, with publications at{' '}
              <Highlight colors={colors}>CHI, IEEE VIS/TVCG, CVPR, ECCV, and EMNLP.</Highlight>
            </Typography>

            <Typography variant="body1" component="p" sx={{ mt: 2 }}>
              I am particularly interested in starting from problems that emerge in human experience, translating them
              into technical challenges in AI, and bringing the resulting capabilities back into interactive systems
              that people can actually use. I earned my B.S. and M.S. degrees from the Computer Science department at{' '}
              <Link target="_blank" rel="noopener noreferrer" href="https://www.unist.ac.kr">
                UNIST
              </Link>
              , where I worked with Prof. Sungahn Ko in the{' '}
              <Link target="_blank" rel="noopener noreferrer" href="https://ivader.unist.ac.kr/">
                iVADER Lab
              </Link>
              . Prior to my PhD, I worked as an AI Applied Researcher at{' '}
              <Link target="_blank" rel="noopener noreferrer" href="https://webtoonscorp.com/en/">
                Naver Webtoon
              </Link>{' '}
              and{' '}
              <Link target="_blank" rel="noopener noreferrer" href="https://lunit.io/">
                Lunit
              </Link>{' '}
              as part of my military service.
            </Typography>
          </Animate>

          {/*
            Grid container 는 spacing 만큼 음수 마진을 걸기 때문에 여기에 직접 mt 를 주면
            그만큼 깎여서 위 문단과 붙어버린다. 바깥 Box 로 간격을 준다.
            Education 쪽 기관명이 길어 줄바꿈되지 않도록 7:5 로 나눈다.
          */}
          <Box sx={{ mt: { xs: 5, sm: 7 } }}>
            <Grid container spacing={{ xs: 2, sm: 4 }}>
              <Grid item xs={12} sm={7}>
                <Animate delay={0.15}>
                  <Typography variant="h5" component="h3">
                    Education
                  </Typography>
                  {Educations.map((item) => (
                    <ExperienceItem key={item.content} type="SCHOOL" title={item.title} content={item.content} />
                  ))}
                </Animate>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Animate delay={0.15}>
                  <Typography variant="h5" component="h3">
                    Work Experiences
                  </Typography>
                  {Experiences.map((item) => (
                    <ExperienceItem key={item.title} type="COMPANY" title={item.title} content={item.content} />
                  ))}
                </Animate>
              </Grid>
            </Grid>
          </Box>

          <Animate delay={0.15}>
            <News />
          </Animate>
        </Grid>
      </Grid>
    </section>
  );
});

AboutPage.displayName = 'AboutPage';

export default AboutPage;
