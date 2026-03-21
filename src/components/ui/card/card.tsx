import * as React from 'react';
import styles from './card.module.css';

export interface CardRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardRoot = React.forwardRef<HTMLDivElement, CardRootProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={`${styles.root} ${className || ''}`} {...props}>
        {children}
      </div>
    );
  }
);
CardRoot.displayName = 'CardRoot';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'critical' | 'warning' | 'good';
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, variant = 'good', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.header} ${className || ''}`}
        {...props}
      >
        <span className={`${styles.dot} ${styles[variant]}`} />
        {children}
      </div>
    );
  }
);
CardHeader.displayName = 'CardHeader';

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={`${styles.title} ${className || ''}`}
        {...props}
      />
    );
  }
);
CardTitle.displayName = 'CardTitle';

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={`${styles.description} ${className || ''}`}
      {...props}
    />
  );
});
CardDescription.displayName = 'CardDescription';

export { CardRoot, CardHeader, CardTitle, CardDescription };
