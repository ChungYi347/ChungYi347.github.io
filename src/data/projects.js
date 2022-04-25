import InteractiveSegmentation2022 from '../assets/images/InteractiveSegmentation2022.png';
// import QualityMatter2022 from '../assets/images/QualityMatter2022.png';
import CVPR2022 from '../assets/images/CVPR2022.png';
import CHI2020 from '../assets/images/CHI2020.png';
import CIKM2020 from '../assets/images/CIKM2020.png';
import TVCG2019 from '../assets/images/TVCG2019.png';
import ForecastingSys2019 from '../assets/images/ForecastingSys2019.png';
import GenomeAnalysis2018 from '../assets/images/GenomeAnalysis2018.png';
import Circos2018 from '../assets/images/Circos2018.png';
import MCV2018 from '../assets/images/MCV2018.png';

import TVCG2019PDF from '../assets/pdfs/TVCG2019.pdf';

const projs = [
  {
    title: 'Interactive Multi-Class Tiny-Object Detection.',
    image: CVPR2022,
    content:
      'Annotating tens or hundreds of tiny objects in a given \
    image is laborious yet crucial for a multitude of Computer \
    Vision tasks. Such imagery typically contains objects from \
    various categories, yet the multi-class interactive annotation \
    setting for the detection task has thus far been unexplored. \
    To address these needs, we propose a novel interactive annotation \
    method for multiple instances of tiny objects \
    from multiple classes, based on a few point-based user inputs. \
    Our approach, C3Det, relates the full image context \
    with annotator inputs in a local and global manner via latefusion and \
    feature-correlation, respectively. We perform experiments on the Tiny-DOTA and LCell datasets using both \
    two-stage and one-stage object detection architectures to \
    verify the efficacy of our approach. Our approach outperforms existing approaches \
    in interactive annotation, achieving higher mAP with fewer clicks. Furthermore, we validate \
    the annotation efficiency of our approach in a user study \
    where it is shown to be 2.85x faster and yield only 0.36x \
    task load (NASA-TLX, lower is better) compared to manual \
    annotation. The code is available at https://github. \
    com/ChungYi347/Interactive-Multi-ClassTiny-Object-Detection. ',
    tags: [
      { tag: '[PDF]', link: 'https://arxiv.org/abs/2203.15266' },
      { tag: '[Video]', link: 'https://vimeo.com/700148797' },
    ],
  },
  {
    title: 'Interactive Segmentation for Tissue.',
    image: InteractiveSegmentation2022,
    content:
      'Object segmentation play an important role in the workflow of computational pathlogy. \
    Unlike general object segmentation, manually labeling pathology data is very time consuming and \
    expensive due to requiring expert knowledge. One solution is that interactive segmentaiton method \
    offer more effient by using user-provided inputs such as points, lines, and polygon, which means  \
    user gives information of classes models and model automatically find similar areas. \
    We build a new novel method which has a undertanding given user inputs with user input enforcing \
    loss based on the DeepLab V3+ model. On top of that, we generated random points or many diverse curved-lines to \
    simulate user inputs. In our real-annotation process, we proved that this method takes 14.7% of \
    time compared to manuall annotation. The procudure is above figure 1) draw points, lines, and polygons \
    2) request inference and check the results. 3) revised given user inputs and request inference \
    , and 4) check whether the annotation is correct or not.',
    tags: [{ tag: '[Video]', link: 'https://vimeo.com/700149891' }],
  },
  {
    title: 'GUIComp: A GUI Design Assistant with Real-Time, Multi-Faceted Feedback.',
    image: CHI2020,
    content:
      'Users may face challenges while designing graphical user \
    interfaces, due to a lack of relevant experience and guidance. \
    This paper aims to investigate the issues that users with no \
    experience face during the design process, and how to resolve \
    them. To this end, we conducted semi-structured interviews, \
    based on which we built a GUI prototyping assistance tool \
    called GUIComp. This tool can be connected to GUI design \
    software as an extension, and it provides real-time, multifaceted \
    feedback on a user’s current design. Additionally, we \
    conducted two user studies, in which we asked participants to \
    create mobile GUIs with or without GUIComp, and requested \
    online workers to assess the created GUIs. The experimental \
    results show that GUIComp facilitated iterative design and the \
    participants with GUIComp had better a user experience and \
    produced more acceptable designs than those who did not.',
    tags: [
      { tag: '[PDF]', link: 'https://arxiv.org/abs/2001.05684' },
      { tag: '[Preview Video]', link: 'https://www.youtube.com/watch?v=UkqTStZEVbo' },
      { tag: '[Video]', link: 'https://vimeo.com/700148306' },
    ],
  },
  {
    title: 'STGRAT: A Spatio-Temporal Graph Attention Network for Traffic Forecasting',
    image: CIKM2020,
    content:
      'Predicting road traffic speed is a challenging task due to different \
     types of roads, abrupt speed change and spatial dependencies \
    between roads; it requires the modeling of dynamically changing \
    spatial dependencies among roads and temporal patterns over long \
    input sequences. This paper proposes a novel spatio-temporal graph \
    attention (ST-GRAT) that effectively captures the spatio-temporal \
    dynamics in road networks. The novel aspects of our approach \
    mainly include spatial attention, temporal attention, and spatial \
    sentinel vectors. The spatial attention takes the graph structure \
    information (e.g., distance between roads) and dynamically adjusts \
    spatial correlation based on road states. The temporal attention is \
    responsible for capturing traffic speed changes, and the sentinel \
    vectors allow the model to retrieve new features from spatially \
    correlated nodes or preserve existing features. The experimental \
    results show that ST-GRAT outperforms existing models, especially \
    in difficult conditions where traffic speeds rapidly change (e.g., rush \
    hours). We additionally provide a qualitative study to analyze when \
    and where ST-GRAT tended to make accurate predictions during \
    rush-hour times.',
    tags: [{ tag: '[PDF]', link: 'https://arxiv.org/abs/1911.13181' }],
  },
  {
    title: 'A visual analytics system for exploring, monitoring, and forecasting road traffic congestion.',
    image: TVCG2019,
    content:
      'We present an interactive visual analytics system that \
    enables traffic congestion exploration, surveillance, and forecasting \
    based on vehicle detector data. Through domain expert collaboration, \
    we have extracted task requirements, incorporated the Long \
    Short-Term Memory (LSTM) model for congestion forecasting, and \
    designed a weighting method for detecting the causes of \
    congestion and congestion propagation directions. Our visual \
    analytics system is designed to enable users to explore congestion \
    causes, directions, and severity. Congestion conditions of a city are \
    visualized using a Volume-Speed Rivers (VSRivers) visualization \
    that simultaneously presents traffic volumes and speeds. To evaluate \
    our system, we report performance comparison results, wherein \
    our model is more accurate than other forecasting algorithms. We \
    demonstrate the usefulness of our system in the traffic management \
    and congestion broadcasting domains through three case studies and \
    domain expert feedback.',
    tags: [
      { tag: '[PDF]', link: TVCG2019PDF },
      { tag: '[Link]', link: '"https://ieeexplore.ieee.org/document/8735916"' },
      { tag: '[Video]', link: 'https://vimeo.com/700148275' },
    ],
  },
  {
    title: 'A Traffic Forecasting System.',
    image: ForecastingSys2019,
    content:
      'Intelligent transportation such sensors under ground has been made our life more conenient and efficent. \
     It leads to giving tremendous data us to develop traffic forecasting models. \
     By using these tremendous data, deep learning models (e.g., LSTM, CNN, and GNN) have been applied traffic prediction \
     to learn spatial and temporal dynamics. In this project, we built a traffic forecasting system to make broadcasting scripts \
     during traffic broadcasting, providing detour routes with forecasting listeners. This detour routes have been solved traffic congestion \
     during rush hours. We have deployed these systems in metropolitan cities like Busan, Ulsan, and etc. \
     On top of that, this system visualizes current traffic situaion and CCTV views of each individual road.',
    tags: [],
  },
  {
    title: 'The Relationship between the Number of Coordinated Views and Visual Data Analysis.',
    image: MCV2018,
    content:
      'Many visualization applications have been developed using multiple coordinated views. \
    Our widely, safely adopted assumption is that many views bring forth fruitful outcomes, \
    such as new perspectives, various analytic paths, and accurate results. \
    However, very little empirical work has been reported to prove or disprove these beliefs. \
    Our study aims to investigate the relationship between the number of coordinated views \
    and users analytic processes and results. Furthermore, we aim to provide a design \
    guideline on how to help users create and manage more views if having more views is \
    indeed more helpful. To achieve the goals, we \
    conducted a human subject study with 44 participants. In the experiment, we asked \
    participants to solve five analytic problems using \
    a visualization system. Through quantitative and qualitative analysis, \
    we discovered the positive correlation between the number of \
    views and analytic results. We also found that a simple view creation \
    technique called dynamic visualization cloning (DVC) encourage \
    users to create more views and to take a variety of analytic paths. \
    Based on the results, we provide implications and limitations of our study.',
    tags: [{ tag: '[PDF]', link: '' }],
  },
  {
    title: 'A Visual Analysis System for Gene Expression Analysis.',
    image: GenomeAnalysis2018,
    content:
      'Graphical history mechanisms have been widely utilized in \
    many domains to support humans’ limited working memory, \
    error recovery, collaboration, and presentation in visual analysis. \
    Yet, there are aspects that remain under-explored in designing \
    graphical history systems for visual analytics systems to help \
    analysts who have complicated workflows. In this paper we report \
    on our design study performed with domain experts, where we \
    characterize domain tasks and designed a visual graphical workflow \
    management environment. Our environment allows analysts to efficiently \
    review, edit, navigate, and explore their complex workflows \
    with their colleagues. In order to evaluate the environment, \
    we present a case study and user study. In the case study, we explore \
    how two domain experts perform collaborative review, communication, \
    and training with our environment; while in the user study with \
    the car data, we reveal that how our environment helps users and \
    how the history mechanism affects users’ visual problem-solving behaviors',
    tags: [
      { tag: '[PDF]', link: '' },
      { tag: '[Video]', link: 'https://vimeo.com/700148330' },
    ],
  },
  {
    title: 'Circos for Exploring Relationships between Genes.',
    image: Circos2018,
    content:
      'Circos is a visualization method to shows differences and \
    similiarities among genomes. We developed a visualization tool with \
    circos to faciliate relationships between pairs of positions of genes.',
    tags: [],
  },
];

export default projs;
