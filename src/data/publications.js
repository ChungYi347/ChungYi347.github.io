import VIS2024 from '../assets/images/VIS2024.gif';
import AAAI2024 from '../assets/images/AAAI2024.gif';
import MM2023 from '../assets/images/MM2023.png';
import TILDEQ from '../assets/images/TILDE2022.png';
import CVPR2022 from '../assets/images/CVPR2022.png';
import ECCVW2022 from '../assets/images/ECCVW2022.png';
import CHI2020 from '../assets/images/CHI2020.png';
import CIKM2020 from '../assets/images/CIKM2020.png';
import TVCG2019 from '../assets/images/TVCG2019.png';
import MCV2018 from '../assets/images/MCV2018.png';
import GenomeAnalysis2018 from '../assets/images/GenomeAnalysis2018.png';
import TVCG2019PDF from '../assets/pdfs/TVCG2019.pdf';
import VAIR2025 from '../assets/images/VAIR2025.png';
import VISTAR2026 from '../assets/images/VISTAR2026.gif';
import BRIDGE2026 from '../assets/images/BRIDGE2026.gif'

const pubs = [
  {
    title: 'BRIDGE: Borderless Reconfiguration for Inclusive and Diverse Gameplay Experience via Embodiment Transformation.',
    author: 'Hayato Saiki, Chunggi Lee, Hikari Takahashi, Tica Lin, Hidetada Kishi, Kaori Tachibana, Yasuhiro Suzuki, Hanspeter Pfister, Kenji Suzuki',
    conference: 'ACM CHI Conference on Human Factors in Computing Systems (CHI), 2026. #03c2c9Best Paper Award',
    image: BRIDGE2026,
    tags: [{ tag: '[PDF]', link: 'https://arxiv.org/pdf/2602.23288' }],
  },
  {
    title: 'ViSTAR: Virtual Skill Training with Augmented Reality with 3D Avatars and LLM coaching agent.',
    author: 'Chunggi Lee*, Hayato Saiki*, Tica Lin, Eiji Ikeda, Kenji Suzuki, Chen Zhu-Tian, Hanspeter Pfister',
    conference: 'ACM CHI Conference on Human Factors in Computing Systems (CHI), 2026.',
    image: VISTAR2026,
    tags: [{ tag: '[PDF]', link: 'https://arxiv.org/pdf/2602.22077' }],
  },
  {
    title: 'VAIR: Visual Analytics for Injury Risk Exploration in Sports.',
    author: 'Chunggi Lee, Ut Gong, Tica Lin, Stefanie Zollmann, Scott A Epsley, Adam Petway, Hanspeter Pfister',
    conference: 'IEEE 16th Workshop on Visual Analytics in Healthcare (VAHC).',
    image: VAIR2025,
    tags: [{ tag: '[PDF]', link: 'https://arxiv.org/pdf/2512.17446' }],
  },
  {
    title: 'Sportify: Question Answering with Embedded Visualizations and Personified Narratives for Sports Video.',
    author: 'Chunggi Lee, Tica Lin, Hanspeter Pfister, Chen Zhu-Tian',
    conference: 'IEEE Transactions on Visualization and Computer Graphics (IEEE VIS).',
    image: VIS2024,
    tags: [{ tag: '[PDF]', link: 'https://arxiv.org/abs/2408.05123' }, {tag: '[Webpage]', link: 'https://chungyi347.github.io/Sportify/'}],
  },
  {
    title: 'DreamStyler: Paint by Style Inversion with Text-to-Image Diffusion Models.',
    author: 'Namhyuk Ahn, Junsoo Lee, Chunggi Lee, Kunhee Kim, Daesik Kim, Seung-Hun Nam, Kibeom Hong',
    conference: 'The Association for the Advancement of Artificial Intelligence (AAAI), 2024, Accepted',
    image: AAAI2024,
    tags: [{ tag: '[PDF]', link: 'https://arxiv.org/pdf/2309.06933.pdf' }, 
      {tag: '[Webpage]', link: 'https://nmhkahn.github.io/dreamstyler/'}, 
      {tag: '[Code]', link: 'https://github.com/webtoon/dreamstyler'}],
  },
  {
    title:
      'FlatGAN: A Holistic Approach for Robust Flat-Coloring in High-Definition with Understanding Line Discontinuity.',
    author: 'Han Kim*, Chunggi Lee*, Junsoo Lee*, Dohyun Kim, Kwangjin Lee, Moohyun Oh, Daesik Kim',
    conference: 'ACM Multimedia (MM), 2023, Accepted',
    image: MM2023,
    tags: [{ tag: '[PDF]', link: 'https://dl.acm.org/doi/10.1145/3581783.3613788' }],
  },
  {
    title: 'TILDE-Q: A Transformation Invariant Loss Function for Time-Series Forecasting.',
    author: 'Hyunwook Lee, Chunggi Lee, Hongkyu Lim, Sungahn Ko',
    conference: 'Preprint',
    image: TILDEQ,
    tags: [{ tag: '[PDF]', link: 'https://arxiv.org/abs/2210.15050' }],
  },
  {
    title: 'Variability Matters : Evaluating inter-rater variability in histopathology for robust cell detection.',
    author: 'Cholmin Kang, Chunggi Lee, Heon Song, Minuk Ma, S ́ergioPereira',
    conference: 'European Conference on Computer Vision Workshop (ECCVW), 2022, Accepted ',
    image: ECCVW2022,
    tags: [{ tag: '[PDF]', link: 'https://arxiv.org/abs/2210.05175' }],
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
