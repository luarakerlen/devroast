import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { BadgeDot, BadgeLabel, BadgeRoot } from '@/components/ui/badge/badge';
import { Button } from '@/components/ui/button/button';
import {
  CardDescription,
  CardHeader,
  CardRoot,
  CardTitle,
} from '@/components/ui/card/card';
import {
  CodeBlockContent,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockRoot,
} from '@/components/ui/code-block/code-block';
import { ScoreRing } from '@/components/ui/score-ring/score-ring';
import { createCaller, createContext } from '~/server/trpc/caller';
import styles from './roast.module.css';

export const metadata = {
  title: 'Roast Result | DevRoast',
  description: 'Your code roast result',
};

interface RoastPageProps {
  params: Promise<{ id: string }>;
}

async function RoastContent({ id }: { id: string }) {
  const caller = createCaller(await createContext());
  const roast = await caller.roast.getById({ id });

  if (!roast) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.scoreHero}>
        <ScoreRing score={roast.score} className={styles.scoreRing} />

        <div className={styles.roastSummary}>
          <BadgeRoot variant="critical" className={styles.roastBadge}>
            <BadgeDot variant="critical" />
            <BadgeLabel>verdict: {roast.verdict}</BadgeLabel>
          </BadgeRoot>
          <h1 className={styles.roastTitle}>"{roast.quote}"</h1>
          <div className={styles.roastMeta}>
            <span>lang: {roast.language}</span>
            <span className={styles.metaDot}>·</span>
            <span>{roast.lineCount} lines</span>
          </div>
          <div className={styles.shareRow}>
            <Button variant="outline" size="sm">
              $ share_roast
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          <span className={styles.titlePrompt}>{'//'}</span>
          <span className={styles.titleText}>your_submission</span>
        </div>
        <CodeBlockRoot className={styles.codeBlock}>
          <CodeBlockHeader>
            <CodeBlockFilename>
              your_code.{roast.language.toLowerCase()}
            </CodeBlockFilename>
          </CodeBlockHeader>
          <CodeBlockContent
            code={roast.code}
            language={roast.language.toLowerCase()}
          />
        </CodeBlockRoot>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          <span className={styles.titlePrompt}>{'//'}</span>
          <span className={styles.titleText}>detailed_analysis</span>
        </div>
        <div className={styles.issuesGrid}>
          {roast.analysis.map((issue) => (
            <CardRoot key={`${issue.type}-${issue.lineNumber}`}>
              <CardHeader
                variant={
                  issue.severity === 'high'
                    ? 'critical'
                    : issue.severity === 'medium'
                      ? 'warning'
                      : 'good'
                }
              >
                <span>{issue.severity}</span>
              </CardHeader>
              <CardTitle>{issue.title}</CardTitle>
              <CardDescription>{issue.description}</CardDescription>
            </CardRoot>
          ))}
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          <span className={styles.titlePrompt}>{'//'}</span>
          <span className={styles.titleText}>meta_info</span>
        </div>
        <div className={styles.metaGrid}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>mode:</span>
            <span className={styles.metaValue}>{roast.mode}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>provider:</span>
            <span className={styles.metaValue}>{roast.provider}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>model:</span>
            <span className={styles.metaValue}>{roast.model}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RoastSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.scoreHero}>
        <div className={`${styles.skeleton} ${styles.skeletonScoreRing}`} />
        <div className={styles.roastSummary}>
          <div className={`${styles.skeleton} ${styles.skeletonBadge}`} />
          <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
          <div className={`${styles.skeleton} ${styles.skeletonMeta}`} />
        </div>
      </div>
    </div>
  );
}

export default async function RoastResultPage({ params }: RoastPageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<RoastSkeleton />}>
      <RoastContent id={id} />
    </Suspense>
  );
}
