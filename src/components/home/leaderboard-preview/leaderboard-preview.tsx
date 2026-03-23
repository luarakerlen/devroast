import NumberFlow from '@number-flow/react';
import Link from 'next/link';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button/button';
import {
  LeaderboardRow,
  LeaderboardRowSkeleton,
} from '@/components/ui/leaderboard-row/leaderboard-row';
import { createCaller, createContext } from '~/server/trpc/caller';
import styles from './leaderboard-preview.module.css';

interface LeaderboardItem {
  rank: number;
  id: string;
  score: number;
  code: string;
  filename: string;
  language: string;
}

function getPreviewCode(code: string): string {
  const lines = code.split('\n');
  if (lines.length <= 3) return code;
  return lines.slice(0, 3).join('\n');
}

async function LeaderboardServer() {
  'use cache';
  const caller = createCaller(await createContext());
  const { items, totalCount } = await caller.leaderboard.getTopShame();
  return <LeaderboardContent items={items} totalCount={totalCount} />;
}

function LeaderboardContent({
  items,
  totalCount,
}: {
  items: LeaderboardItem[];
  totalCount: number;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <span className={styles.titlePrompt}>{`//`}</span>
          <span className={styles.titleText}>shame_leaderboard</span>
        </div>
        <Link href="/leaderboard">
          <Button variant="ghost" className={styles.viewAllButton}>
            <span className={styles.viewAllText}>$ view_all &gt;&gt;</span>
          </Button>
        </Link>
      </div>
      <span className={styles.subtitle}>
        {`// the worst code on the internet, ranked by shame`}
      </span>

      <div className={styles.list}>
        {items.map((item) => (
          <LeaderboardRow
            key={item.id}
            rank={item.rank}
            id={item.id}
            score={item.score}
            code={item.code}
            previewCode={getPreviewCode(item.code)}
            filename={item.filename}
            language={item.language}
          />
        ))}
      </div>

      <div className={styles.footer}>
        <Link href="/leaderboard" className={styles.footerLink}>
          showing top 3 of <NumberFlow value={totalCount} /> · view full
          leaderboard &gt;&gt;
        </Link>
      </div>
    </div>
  );
}

export function LeaderboardPreviewSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <span className={styles.titlePrompt}>{`//`}</span>
          <span className={styles.titleText}>shame_leaderboard</span>
        </div>
        <Button variant="ghost" className={styles.viewAllButton} disabled>
          <span className={styles.viewAllText}>$ view_all &gt;&gt;</span>
        </Button>
      </div>
      <span className={styles.subtitle}>
        {`// the worst code on the internet, ranked by shame`}
      </span>

      <div className={styles.list}>
        {(['a', 'b', 'c'] as const).map((key) => (
          <LeaderboardRowSkeleton key={key} />
        ))}
      </div>

      <div className={styles.footer}>
        <span className={`${styles.skeleton} ${styles.skeletonFooter}`} />
      </div>
    </div>
  );
}

export function LeaderboardPreview() {
  return (
    <Suspense fallback={<LeaderboardPreviewSkeleton />}>
      <LeaderboardServer />
    </Suspense>
  );
}
