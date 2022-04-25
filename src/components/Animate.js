import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Animate = ({ children, delay }) => {
  const second = delay === undefined ? 0 : delay;
  const TitleAnim = {
    visible: { opacity: 1, transition: { duration: 1, delay: second } },
    hidden: { opacity: 0 },
  };

  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  return (
    <motion.div ref={ref} animate={controls} initial="hidden" variants={TitleAnim}>
      {children}
    </motion.div>
  );
};

export default Animate;
