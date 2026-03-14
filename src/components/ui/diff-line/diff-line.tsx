import * as React from 'react';
import styles from './diff-line.module.css';

export interface DiffLineRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'removed' | 'added' | 'context';
}

const DiffLineRoot = React.forwardRef<HTMLDivElement, DiffLineRootProps>(
  ({ className, type = 'context', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.root} ${styles[type]} ${className || ''}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DiffLineRoot.displayName = 'DiffLineRoot';

export interface DiffLinePrefixProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  type?: 'removed' | 'added' | 'context';
}

function DiffLinePrefix({
  className,
  type = 'context',
  children,
  ...props
}: DiffLinePrefixProps) {
  return (
    <span
      className={`${styles.prefix} ${styles[`prefix${type.charAt(0).toUpperCase() + type.slice(1)}`]} ${className || ''}`}
      {...props}
    >
      {children}
    </span>
  );
}
DiffLinePrefix.displayName = 'DiffLinePrefix';

export interface DiffLineContentProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  type?: 'removed' | 'added' | 'context';
}

function DiffLineContent({
  className,
  type = 'context',
  children,
  ...props
}: DiffLineContentProps) {
  return (
    <span
      className={`${styles[`content${type.charAt(0).toUpperCase() + type.slice(1)}`]} ${className || ''}`}
      {...props}
    >
      {children}
    </span>
  );
}
DiffLineContent.displayName = 'DiffLineContent';

export { DiffLineRoot, DiffLinePrefix, DiffLineContent };
