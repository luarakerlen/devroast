import NumberFlow from '@number-flow/react';
import { Suspense } from 'react';
import { LeaderboardRowSkeleton } from '@/components/ui/leaderboard-row/leaderboard-row';
import { createCaller, createContext } from '~/server/trpc/caller';
import styles from './leaderboard.module.css';
import { LeaderboardList } from './leaderboard-list';

export const metadata = {
  title: 'Shame Leaderboard | DevRoast',
  description: 'The most roasted code on the internet, ranked by shame.',
};

async function LeaderboardContent() {
  'use cache';
  const caller = createCaller(await createContext());
  const [{ items, totalCount }, stats] = await Promise.all([
    caller.leaderboard.getAll({ limit: 20 }),
    caller.metrics.getStats(),
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <div className={styles.titleRow}>
          <span className={styles.titlePrompt}>{'>'}</span>
          <span className={styles.titleText}>shame_leaderboard</span>
        </div>
        <span className={styles.subtitle}>
          {'// the worst code on the internet, ranked by shame'}
        </span>
        <div className={styles.statsRow}>
          <span className={styles.stat}>
            <NumberFlow value={totalCount} /> submissions
          </span>
          <span className={styles.statDot}>·</span>
          <span className={styles.stat}>
            avg score: <NumberFlow value={stats.avgScore} /> /10
          </span>
        </div>
      </div>

      <LeaderboardList
        initialItems={items}
        hasMore={items.length < totalCount}
        totalCount={totalCount}
      />
    </div>
  );
}

function LeaderboardSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <div className={styles.titleRow}>
          <span className={styles.titlePrompt}>{'>'}</span>
          <span className={styles.titleText}>shame_leaderboard</span>
        </div>
        <span className={styles.subtitle}>
          {'// the worst code on the internet, ranked by shame'}
        </span>
        <div className={styles.statsRow}>
          <span className={`${styles.skeleton} ${styles.skeletonStat}`} />
          <span className={styles.statDot}>·</span>
          <span className={`${styles.skeleton} ${styles.skeletonStat}`} />
        </div>
      </div>

      <div className={styles.list}>
        {(['a', 'b', 'c', 'd', 'e'] as const).map((key) => (
          <LeaderboardRowSkeleton key={key} />
        ))}
      </div>
    </div>
  );
}

export default function LeaderboardPage() {
  return (
    <Suspense fallback={<LeaderboardSkeleton />}>
      <LeaderboardContent />
    </Suspense>
  );
}
