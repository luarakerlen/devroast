import * as React from 'react';
import styles from './score-ring.module.css';

export interface ScoreRingProps {
  score: number;
  maxScore?: number;
  className?: string;
}

const ScoreRing = React.forwardRef<HTMLDivElement, ScoreRingProps>(
  ({ score, maxScore = 10, className }, ref) => {
    const radius = 86;
    const circumference = 2 * Math.PI * radius;
    const percentage = score / maxScore;

    return (
      <div ref={ref} className={`${styles.root} ${className || ''}`}>
        <svg
          className={styles.svg}
          viewBox="0 0 180 180"
          aria-label={`Score: ${score} out of ${maxScore}`}
        >
          <circle cx="90" cy="90" r={radius} className={styles.circleBase} />
          <circle
            cx="90"
            cy="90"
            r={radius}
            className={styles.circleProgress}
            stroke="url(#scoreGradient)"
            strokeDasharray={`${percentage * circumference} ${circumference}`}
          />
          <defs>
            <linearGradient
              id="scoreGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="35%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
        </svg>
        <div className={styles.scoreContainer}>
          <span className={styles.score}>{score}</span>
          <span className={styles.maxScore}>/{maxScore}</span>
        </div>
      </div>
    );
  }
);
ScoreRing.displayName = 'ScoreRing';

export { ScoreRing };
