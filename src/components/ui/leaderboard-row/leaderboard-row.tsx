'use client';

import { ChevronDown, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import styles from './leaderboard-row.module.css';

interface LeaderboardRowProps {
  rank: number;
  id: string;
  score: number;
  code: string;
  previewCode: string;
  filename: string;
  language: string;
}

function ExpandButton({
  isExpanded,
  onToggle,
}: {
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <button type="button" className={styles.expandButton} onClick={onToggle}>
      <ChevronDown
        className={`${styles.expandIcon} ${isExpanded ? styles.expanded : ''}`}
      />
      <span>{isExpanded ? 'ver menos' : 'ver mais'}</span>
    </button>
  );
}

function CodeBlockDisplay({
  code,
  filename,
}: {
  code: string;
  filename: string;
}) {
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

export function LeaderboardRowSkeleton() {
  return (
    <div className={styles.rowContainer}>
      <div className={styles.skeletonMeta}>
        <span className={`${styles.skeleton} ${styles.skeletonRank}`} />
        <span className={`${styles.skeleton} ${styles.skeletonScore}`} />
        <span className={`${styles.skeleton} ${styles.skeletonLang}`} />
      </div>
      <div className={`${styles.skeleton} ${styles.skeletonCodeBlock}`} />
    </div>
  );
}
