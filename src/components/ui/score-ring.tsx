import * as React from 'react';
import { tv } from 'tailwind-variants';

const scoreRing = tv({
  base: 'relative inline-flex items-center justify-center',
});

export interface ScoreRingProps {
  score: number;
  maxScore?: number;
  className?: string;
}

function calculateStrokeDasharray(score: number, maxScore: number) {
  const circumference = 2 * Math.PI * 86;
  const progress = (score / maxScore) * circumference;
  return `${progress} ${circumference}`;
}

const ScoreRing = React.forwardRef<HTMLDivElement, ScoreRingProps>(
  ({ score, maxScore = 10, className }, ref) => {
    const strokeDasharray = calculateStrokeDasharray(score, maxScore);

    return (
      <div ref={ref} className={scoreRing({ className })}>
        <svg
          className="absolute w-[180px] h-[180px] -rotate-90"
          viewBox="0 0 180 180"
          aria-label={`Score: ${score} out of ${maxScore}`}
        >
          <circle
            cx="90"
            cy="90"
            r="86"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-zinc-800"
          />
          <circle
            cx="90"
            cy="90"
            r="86"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="35%" stopColor="#F59E0B" />
              <stop offset="36%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
        <div className="flex items-baseline gap-0.5">
          <span className="text-5xl font-bold font-mono text-zinc-100">
            {score}
          </span>
          <span className="text-base font-mono text-zinc-500">/{maxScore}</span>
        </div>
      </div>
    );
  }
);
ScoreRing.displayName = 'ScoreRing';

export { ScoreRing };
