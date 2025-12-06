import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'valorant' | 'csgo' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, type = 'button', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-full';
    
    const variants = {
      primary: 'bg-gradient-to-r from-[#ff6b9d] via-[#c471f5] to-[#7b68ee] text-white shadow-lg hover:shadow-[0_8px_30px_rgba(196,113,245,0.4)]',
      secondary: 'bg-white/05 hover:bg-white/10 text-white border border-white/10 hover:border-white/20',
      ghost: 'hover:bg-white/05 text-white/70 hover:text-white',
      danger: 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white',
      valorant: 'bg-gradient-to-r from-[#ff4655] to-[#ff6b9d] text-white shadow-lg hover:shadow-[0_8px_30px_rgba(255,70,85,0.4)]',
      csgo: 'bg-gradient-to-r from-[#de9b35] to-[#f5a623] text-white shadow-lg hover:shadow-[0_8px_30px_rgba(222,155,53,0.4)]',
      outline: 'bg-transparent text-white border border-white/20 hover:bg-white/05 hover:border-white/30',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-2.5',
      lg: 'px-8 py-3 text-lg',
    };

    return (
      <motion.button
        ref={ref}
        type={type as ButtonHTMLAttributes<HTMLButtonElement>['type']}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
