import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className, hover = false, onClick }: GlassCardProps) {
  const Component = hover ? motion.div : 'div';
  
  const hoverProps = hover
    ? {
        whileHover: { y: -4, boxShadow: '0 0 30px rgba(6, 182, 212, 0.2)' },
        transition: { duration: 0.2 },
      }
    : {};

  return (
    <Component
      className={cn(
        'glass-card',
        hover && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      {...hoverProps}
    >
      {children}
    </Component>
  );
}