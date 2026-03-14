import * as React from 'react';
import styles from './button.module.css';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'destructive'
    | 'link';
  size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variantClass = styles[variant];
    const sizeClass = styles[size];

    return (
      <button
        ref={ref}
        className={`${styles.button} ${variantClass} ${sizeClass} ${className || ''}`}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
