import Link from 'next/link';
import { Button } from '@/components/ui/button/button';
import styles from './leaderboard-preview.module.css';

const leaderboardData = [
  {
    rank: '#1',
    score: '2.1',
    code: 'nested_callback_hell.js',
    lang: 'JavaScript',
  },
  { rank: '#2', score: '3.4', code: 'magic_numbers.py', lang: 'Python' },
  { rank: '#3', score: '3.8', code: 'sql_injection.exe', lang: 'Java' },
];

export function LeaderboardPreview() {
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

      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span className={`${styles.headerCell} ${styles.headerRank}`}>
            rank
          </span>
          <span className={`${styles.headerCell} ${styles.headerScore}`}>
            score
          </span>
          <span className={`${styles.headerCell} ${styles.headerCode}`}>
            code
          </span>
          <span className={`${styles.headerCell} ${styles.headerLang}`}>
            lang
          </span>
        </div>
        {leaderboardData.map((item) => (
          <div key={item.code} className={styles.tableRow}>
            <span className={`${styles.cell} ${styles.cellRank}`}>
              {item.rank}
            </span>
            <span className={`${styles.cell} ${styles.cellScore}`}>
              {item.score}
            </span>
            <span className={`${styles.cell} ${styles.cellCode}`}>
              {item.code}
            </span>
            <span className={`${styles.cell} ${styles.cellLang}`}>
              {item.lang}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <Link href="/leaderboard" className={styles.footerLink}>
          showing top 3 of 2,847 · view full leaderboard &gt;&gt;
        </Link>
      </div>
    </div>
  );
}
