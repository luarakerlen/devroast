import NumberFlow from '@number-flow/react';
import { Suspense } from 'react';
import { createCaller, createContext } from '~/server/trpc/caller';
import styles from './footer-hint.module.css';

async function FooterHintServer() {
  'use cache';
  const caller = createCaller(await createContext());
  const stats = await caller.metrics.getStats();
  return <FooterHintContent {...stats} />;
}

function FooterHintContent({
  totalRoasted,
  avgScore,
}: {
  totalRoasted: number;
  avgScore: number;
}) {
  return (
    <div className={styles.container}>
      <span className={styles.stat}>
        <NumberFlow value={totalRoasted} /> codes roasted
      </span>
      <span className={styles.dot}>·</span>
      <span className={styles.stat}>
        avg score: <NumberFlow value={avgScore} /> /10
      </span>
    </div>
  );
}

export function FooterHintSkeleton() {
  return (
    <div className={styles.container}>
      <span className={`${styles.skeleton} ${styles.value}`} />
      <span className={`${styles.skeleton} ${styles.dot}`} />
      <span className={`${styles.skeleton} ${styles.label}`} />
    </div>
  );
}

export function FooterHint() {
  return (
    <Suspense fallback={<FooterHintSkeleton />}>
      <FooterHintServer />
    </Suspense>
  );
}
