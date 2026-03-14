import * as React from 'react';
import { codeToHtml } from 'shiki';
import styles from './code-block.module.css';

export interface CodeBlockRootProps {
  children: React.ReactNode;
  className?: string;
}

function CodeBlockRoot({ children, className }: CodeBlockRootProps) {
  return <div className={`${styles.root} ${className || ''}`}>{children}</div>;
}
CodeBlockRoot.displayName = 'CodeBlockRoot';

export interface CodeBlockHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

function CodeBlockHeader({ children, className }: CodeBlockHeaderProps) {
  return (
    <div className={`${styles.header} ${className || ''}`}>
      <span className={`${styles.dot} ${styles.dotRed}`} />
      <span className={`${styles.dot} ${styles.dotYellow}`} />
      <span className={`${styles.dot} ${styles.dotGreen}`} />
      {children}
    </div>
  );
}
CodeBlockHeader.displayName = 'CodeBlockHeader';

export interface CodeBlockFilenameProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

function CodeBlockFilename({ className, ...props }: CodeBlockFilenameProps) {
  return (
    <span className={`${styles.filename} ${className || ''}`} {...props} />
  );
}
CodeBlockFilename.displayName = 'CodeBlockFilename';

export interface CodeBlockContentProps {
  code: string;
  language?: string;
  className?: string;
}

async function CodeBlockContent({
  code,
  language = 'javascript',
  className,
}: CodeBlockContentProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: 'vesper',
  });

  return (
    <div
      className={`${styles.content} ${className || ''}`}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki returns safe HTML with proper escaping
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
CodeBlockContent.displayName = 'CodeBlockContent';

export { CodeBlockRoot, CodeBlockHeader, CodeBlockFilename, CodeBlockContent };
