'use client';

import { ChevronDown, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import styles from './leaderboard-preview.module.css';

interface ExpandButtonProps {
  isExpanded: boolean;
  onToggle: () => void;
}

function ExpandButton({ isExpanded, onToggle }: ExpandButtonProps) {
  return (
    <button type="button" className={styles.expandButton} onClick={onToggle}>
      <ChevronDown
        className={`${styles.expandIcon} ${isExpanded ? styles.expanded : ''}`}
      />
      <span>{isExpanded ? 'ver menos' : 'ver mais'}</span>
    </button>
  );
}

interface LeaderboardRowProps {
  rank: number;
  id: string;
  score: number;
  code: string;
  previewCode: string;
  filename: string;
  language: string;
}

export function LeaderboardRow({
  rank,
  id,
  score,
  code,
  previewCode,
  filename,
  language,
}: LeaderboardRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.rowContainer}>
      <div className={styles.rowMeta}>
        <span className={styles.rowRank}>#{rank}</span>
        <span className={styles.rowScore}>{score}</span>
        <span className={styles.rowLang}>{language}</span>
      </div>

      <div className={styles.codeSection}>
        <CodeBlockDisplay
          code={isExpanded ? code : previewCode}
          filename={filename}
        />

        <div className={styles.actionsRow}>
          <ExpandButton
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded(!isExpanded)}
          />
          <Link href={`/roast/${id}`} className={styles.viewAnalysisLink}>
            <ExternalLink className={styles.externalIcon} />
            <span>ver análise completa</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

interface CodeBlockDisplayProps {
  code: string;
  filename: string;
}

function CodeBlockDisplay({ code, filename }: CodeBlockDisplayProps) {
  return (
    <div className={styles.codeBlockWrapper}>
      <div className={styles.codeHeader}>
        <div className={styles.codeDots}>
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
        </div>
        <span className={styles.filename}>{filename}</span>
      </div>
      <pre className={styles.codeContent}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
