import styles from './hero-title.module.css';

export function HeroTitle() {
  return (
    <div className={styles.container}>
      <div className={styles.titleRow}>
        <span className={styles.prompt}>$</span>
        <span className={styles.title}>paste your code. get roasted.</span>
      </div>
      <span className={styles.subtitle}>
        {`// drop your code below and we'll rate it — brutally honest or full roast mode`}
      </span>
    </div>
  );
}
