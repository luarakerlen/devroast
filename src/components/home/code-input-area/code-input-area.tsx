import React from 'react';
import styles from './code-input-area.module.css';

export interface CodeInputAreaProps {
  code: string;
  onCodeChange: (code: string) => void;
}

export function CodeInputArea({ code, onCodeChange }: CodeInputAreaProps) {
  const lines = code.split('\n').length;
  const lineNumbers = [...Array(Math.max(lines, 16))].map((_, i) => i + 1);
  const lineNumbersRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleScroll = () => {
    if (lineNumbersRef.current && textareaRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={`${styles.dot} ${styles.dotRed}`} />
        <div className={`${styles.dot} ${styles.dotYellow}`} />
        <div className={`${styles.dot} ${styles.dotGreen}`} />
      </div>
      <div className={styles.body}>
        <div ref={lineNumbersRef} className={styles.lineNumbers}>
          {lineNumbers.map((lineNum) => (
            <span key={lineNum} className={styles.lineNumber}>
              {lineNum}
            </span>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          onScroll={handleScroll}
          placeholder="// paste your code here..."
          className={styles.textarea}
          spellCheck={false}
        />
      </div>
    </div>
  );
}
