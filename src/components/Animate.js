import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * 스크롤해서 화면에 들어올 때 한 번 페이드인한다.
 *
 * 이전에는 화면 밖으로 나가면 다시 hidden 으로 되돌려서, 위로 스크롤할 때마다
 * 이미 읽은 섹션이 사라졌다가 1초에 걸쳐 다시 나타났다. triggerOnce 로 한 번만 실행한다.
 * (Apple HIG Motion: 자주 반복되는 상호작용에 모션을 붙이지 말 것)
 */
const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Animate = ({ children, delay = 0 }) => {
  const reduced = prefersReducedMotion();
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -10% 0px' });

  // 모션 최소화 설정이면 애니메이션 없이 즉시 표시한다
  if (reduced) return <div>{children}</div>;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default Animate;
