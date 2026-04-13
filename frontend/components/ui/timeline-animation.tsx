'use client'

import React from 'react';
import { motion, MotionProps } from 'framer-motion';

interface TimelineContentProps extends MotionProps {
  as?: any;
  type?: string;
  role?: string;
  tabIndex?: number;
  animationNum?: number;
  timelineRef?: React.RefObject<any>;
  customVariants?: any;
  className?: string;
  onClick?: (e: any) => void;
  children?: React.ReactNode;
}

export const TimelineContent = ({
  as: Component = 'div',
  animationNum = 0,
  timelineRef,
  customVariants,
  className,
  children,
  ...props
}: TimelineContentProps) => {
  const MotionComponent = motion(Component as any);

  return (
    <MotionComponent
      variants={customVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -100px 0px' }}
      custom={animationNum}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};
