import { motion } from 'framer-motion';
import React from 'react';

interface StaggerProps {
  /** Duration in seconds */
  duration?: number;
  /** Delay in seconds */
  staggerDelay?: number;
}

export const Stagger: React.FC<StaggerProps> = ({
  children,
  duration = 2,
  staggerDelay = 0.15,
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const item = {
    hidden: { translateY: -10, opacity: 0 },
    show: { translateY: 0, opacity: 1 },
  };

  return (
    <motion.div
      transition={{
        duration,
      }}
      variants={container}
      initial="hidden"
      animate="show">
      {React.Children.map(children, (child, index) => {
        return (
          <motion.div key={index} variants={item}>
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
};
