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
import styles from './roast.module.css';

export const metadata = {
  title: 'Roast Result | DevRoast',
  description: 'Your code roast result',
};

const roastData = {
  id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  score: 3.5,
  verdict: 'needs_serious_help',
  quote:
    'this code looks like it was written during a power outage... in 2005.',
  language: 'JavaScript',
  lines: 7,
  submittedCode: `function processData(data) {
  if (data) {
    if (data.value) {
      return data.value;
    }
  }
  return null;
}`,
  issues: [
    {
      title: 'Nested Conditionals',
      description:
        'Deeply nested if statements make the code hard to read and maintain.',
      severity: 'high',
    },
    {
      title: 'Null Handling',
      description:
        'Using null instead of proper error handling or optional chaining.',
      severity: 'medium',
    },
    {
      title: 'No Type Safety',
      description: 'Lack of TypeScript types makes refactoring risky.',
      severity: 'medium',
    },
    {
      title: 'Magic Return',
      description: 'Returning null silently without logging or throwing.',
      severity: 'low',
    },
  ],
  suggestedFix: `function processData(data) {
  if (!data?.value) {
    console.warn('Invalid data provided');
    return null;
  }
  return data.value;
}`,
};

export default function RoastResultPage() {
  return (
    <div className={styles.container}>
      <div className={styles.scoreHero}>
        <ScoreRing score={roastData.score} className={styles.scoreRing} />

        <div className={styles.roastSummary}>
          <BadgeRoot variant="critical" className={styles.roastBadge}>
            <BadgeDot variant="critical" />
            <BadgeLabel>verdict: {roastData.verdict}</BadgeLabel>
          </BadgeRoot>
          <h1 className={styles.roastTitle}>"{roastData.quote}"</h1>
          <div className={styles.roastMeta}>
            <span>lang: {roastData.language}</span>
            <span className={styles.metaDot}>·</span>
            <span>{roastData.lines} lines</span>
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
            <CodeBlockFilename>your_code.js</CodeBlockFilename>
          </CodeBlockHeader>
          <CodeBlockContent
            code={roastData.submittedCode}
            language={roastData.language.toLowerCase()}
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
          {roastData.issues.map((issue) => (
            <CardRoot key={issue.title}>
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
          <span className={styles.titleText}>suggested_fix</span>
        </div>
        <CodeBlockRoot className={styles.codeBlock}>
          <CodeBlockHeader>
            <CodeBlockFilename>improved_code.js</CodeBlockFilename>
          </CodeBlockHeader>
          <CodeBlockContent
            code={roastData.suggestedFix}
            language={roastData.language.toLowerCase()}
          />
        </CodeBlockRoot>
      </div>
    </div>
  );
}
