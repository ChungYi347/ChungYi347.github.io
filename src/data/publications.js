import CVPR2022 from '../assets/images/CVPR2022.png';
import ECCVW2022 from '../assets/images/ECCVW2022.png';
import CHI2020 from '../assets/images/CHI2020.png';
import CIKM2020 from '../assets/images/CIKM2020.png';
import TVCG2019 from '../assets/images/TVCG2019.png';
import MCV2018 from '../assets/images/MCV2018.png';
import GenomeAnalysis2018 from '../assets/images/GenomeAnalysis2018.png';

import TVCG2019PDF from '../assets/pdfs/TVCG2019.pdf';

const pubs = [
  {
    title: 'Variability Matters : Evaluating inter-rater variability in histopathology for robust cell detection.',
    author: 'Cholmin Kang, Chunggi Lee, Heon Song, Minuk Ma, S ́ergioPereira',
    conference: 'European Conference on Computer Vision Workshop (ECCVW), 2022, Accepted ',
    image: ECCVW2022,
    tags: [{ tag: '[TBA]', link: '' }],
  },
  {
    title: 'Interactive Multi-Class Tiny-Object Detection.',
    author:
      'Chunggi Lee, Seonwook Park, Heon Song, Jeongun Ryu, Sanghoon Kim, Haejoon Kim, Sergio Pereira, Donggeun Yoo',
    conference: 'IEEE Conference on Computer Vision and Pattern Recognition (CVPR), 2022, Accepted ',
    image: CVPR2022,
    tags: [
      { tag: '[PDF]', link: 'https://arxiv.org/abs/2203.15266' },
      { tag: '[Video]', link: 'https://vimeo.com/700148797' },
      { tag: '[Github]', link: 'https://github.com/ChungYi347/Interactive-Multi-Class-Tiny-Object-Detection' },
    ],
  },
  {
    title: 'GUIComp: A GUI Design Assistant with Real-Time, Multi-Faceted Feedback.',
    author: 'Chunggi Lee, Sanghoon Kim, Dongyun Han, Hongjun Yang, Young-Woo Park, Bum Chul Kwon, Sungahn Ko',
    conference: 'ACM CHI Conference on Human Factors in Computing Systems (CHI), 2020, Accepted',
    image: CHI2020,
    tags: [
      { tag: '[PDF]', link: 'https://arxiv.org/abs/2001.05684' },
      { tag: '[Preview Video]', link: 'https://www.youtube.com/watch?v=UkqTStZEVbo' },
      { tag: '[Video]', link: 'https://vimeo.com/700148306' },
    ],
  },
  {
    title: 'STGRAT: A Spatio-Temporal Graph Attention Network for Traffic Forecasting',
    author: 'Cheonbok Park,  Chunggi Lee, Hyojin Bahng, Taeyun Won, Kihwan Kim, Seungmin Jin, Sungahn Ko, Jaegul Choo',
    conference: 'ACM International Conference on Information and Knowledge Management (CIKM), 2020, Accepted',
    image: CIKM2020,
    tags: [{ tag: '[PDF]', link: 'https://arxiv.org/abs/1911.13181' }],
  },
  {
    title: 'A visual analytics system for exploring, monitoring, and forecasting road traffic congestion.',
    author: 'Chunggi Lee, Yeonjun Kim, Seungmin Jin, Dongmin Kim, Ross Maciejewski, David Ebert, and Sungahn Ko',
    conference:
      'IEEE transactions on visualization and computer graphics (TVCG IF=4.579), 2019, Accepted. Invited (Proc. IEEE VIS`19)',
    image: TVCG2019,
    tags: [
      { tag: '[PDF]', link: TVCG2019PDF },
      { tag: '[Video]', link: 'https://vimeo.com/700148275' },
    ],
  },
  {
    title: 'An Empirical Study on the Relationship Between the Number of Coordinated Views and Visual Analysis.',
    author: 'Juyoung Oh, Chunggi Lee, Hwiyeon Kim, Kihwan Kim, Osang Kwon, Eric D. Ragan, Bum Chul Kwon, Sungahn Ko',
    conference: 'Arxiv, 2018',
    image: MCV2018,
    tags: [{ tag: '[PDF]', link: 'https://arxiv.org/abs/2204.09524' }],
  },
  {
    title: 'A Graphical Workflow Exploration Environment For Visual Analytics.',
    author: 'Chunggi Lee, Juyoung Oh, Seungmin Jin, Isaac Cho, and Sungahn Ko',
    conference: 'Arxiv, 2018',
    image: GenomeAnalysis2018,
    tags: [
      { tag: '[PDF]', link: 'https://arxiv.org/abs/2204.10221' },
      { tag: '[Video]', link: 'https://vimeo.com/700148330' },
    ],
  },
];

export default pubs;