import * as React from 'react';
import styles from './badge.module.css';

export interface BadgeRootProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'critical' | 'warning' | 'good';
}

const BadgeRoot = React.forwardRef<HTMLDivElement, BadgeRootProps>(
  ({ className, variant = 'good', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.root} ${styles[variant]} ${className || ''}`}
        {...props}
      />
    );
  }
);
BadgeRoot.displayName = 'BadgeRoot';

export interface BadgeDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'critical' | 'warning' | 'good';
}

const BadgeDot = React.forwardRef<HTMLSpanElement, BadgeDotProps>(
  ({ className, variant = 'good', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`${styles.dot} ${styles[`dot${variant.charAt(0).toUpperCase() + variant.slice(1)}`]} ${className || ''}`}
        {...props}
      />
    );
  }
);
BadgeDot.displayName = 'BadgeDot';

export interface BadgeLabelProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

const BadgeLabel = React.forwardRef<HTMLSpanElement, BadgeLabelProps>(
  ({ className, ...props }, ref) => {
    return <span ref={ref} className={className} {...props} />;
  }
);
BadgeLabel.displayName = 'BadgeLabel';

export { BadgeRoot, BadgeDot, BadgeLabel };
