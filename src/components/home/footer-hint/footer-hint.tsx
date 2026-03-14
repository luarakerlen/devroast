import styles from './footer-hint.module.css';

export function FooterHint() {
  return (
    <div className={styles.container}>
      <span className={styles.stat}>2,847 codes roasted</span>
      <span className={styles.dot}>·</span>
      <span className={styles.stat}>avg score: 4.2/10</span>
    </div>
  );
}
