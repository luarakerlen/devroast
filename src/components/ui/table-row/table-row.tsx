import * as React from 'react';
import styles from './table-row.module.css';

export interface TableRowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const TableRow = React.forwardRef<HTMLDivElement, TableRowProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={`${styles.root} ${className || ''}`} {...props}>
        {children}
      </div>
    );
  }
);
TableRow.displayName = 'TableRow';

export interface TableRowCellProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  width?: number | string;
}

const TableRowCell = React.forwardRef<HTMLDivElement, TableRowCellProps>(
  ({ className, width, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.cell} ${className || ''}`}
        style={width ? { width } : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TableRowCell.displayName = 'TableRowCell';

export interface TableRowRankProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

const TableRowRank = React.forwardRef<HTMLSpanElement, TableRowRankProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`${styles.rank} ${className || ''}`}
        {...props}
      />
    );
  }
);
TableRowRank.displayName = 'TableRowRank';

export interface TableRowScoreProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

const TableRowScore = React.forwardRef<HTMLSpanElement, TableRowScoreProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`${styles.score} ${className || ''}`}
        {...props}
      />
    );
  }
);
TableRowScore.displayName = 'TableRowScore';

export interface TableRowCodeProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

const TableRowCode = React.forwardRef<HTMLSpanElement, TableRowCodeProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`${styles.code} ${className || ''}`}
        {...props}
      />
    );
  }
);
TableRowCode.displayName = 'TableRowCode';

export interface TableRowLangProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

const TableRowLang = React.forwardRef<HTMLSpanElement, TableRowLangProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`${styles.lang} ${className || ''}`}
        {...props}
      />
    );
  }
);
TableRowLang.displayName = 'TableRowLang';

export {
  TableRow,
  TableRowCell,
  TableRowRank,
  TableRowScore,
  TableRowCode,
  TableRowLang,
};
