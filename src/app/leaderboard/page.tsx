import styles from './leaderboard.module.css';

const leaderboardData = [
  {
    rank: '#1',
    score: '2.1',
    code: 'nested_callback_hell.js',
    lang: 'JavaScript',
  },
  { rank: '#2', score: '3.4', code: 'magic_numbers.py', lang: 'Python' },
  { rank: '#3', score: '3.8', code: 'sql_injection.exe', lang: 'Java' },
  {
    rank: '#4',
    score: '4.1',
    code: 'copy_paste_stackoverflow.dart',
    lang: 'Dart',
  },
  { rank: '#5', score: '4.5', code: 'one_function_10k_lines.cs', lang: 'C#' },
];

function LeaderboardPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <span className={styles.titlePrompt}>{`//`}</span>
          <span className={styles.titleText}>shame_leaderboard</span>
        </div>
        <span className={styles.subtitle}>
          {`// the worst code on the internet, ranked by shame`}
        </span>
      </div>

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

      <div className={styles.stats}>
        <span className={styles.stat}>2,847 codes roasted</span>
        <span className={styles.dot}>·</span>
        <span className={styles.stat}>avg score: 4.2/10</span>
      </div>
    </div>
  );
}

export default LeaderboardPage;
