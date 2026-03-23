'use client';

import { useCallback, useState } from 'react';
import { LeaderboardRow } from '@/components/ui/leaderboard-row/leaderboard-row';
import styles from './leaderboard.module.css';

interface LeaderboardItem {
  rank: number;
  id: string;
  score: number;
  code: string;
  filename: string;
  language: string;
}

interface LeaderboardListProps {
  initialItems: LeaderboardItem[];
  hasMore: boolean;
  totalCount: number;
}

function getPreviewCode(code: string): string {
  const lines = code.split('\n');
  if (lines.length <= 3) return code;
  return lines.slice(0, 3).join('\n');
}

export function LeaderboardList({
  initialItems,
  hasMore: initialHasMore,
  totalCount,
}: LeaderboardListProps) {
  const [items, setItems] = useState(initialItems);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(initialItems.length);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/trpc/leaderboard.getAll?input=${JSON.stringify({
          offset,
          limit: 20,
        })}`
      );
      const data = await response.json();
      const result = data.result.data;

      setItems((prev) => [...prev, ...result.items]);
      setHasMore(result.hasMore);
      setOffset((prev) => prev + result.items.length);
    } catch (error) {
      console.error('Failed to load more:', error);
    } finally {
      setIsLoading(false);
    }
  }, [hasMore, isLoading, offset]);

  return (
    <div className={styles.list}>
      {items.map((item) => (
        <LeaderboardRow
          key={item.id}
          rank={item.rank}
          id={item.id}
          score={item.score}
          code={item.code}
          previewCode={getPreviewCode(item.code)}
          filename={item.filename}
          language={item.language}
        />
      ))}

      {hasMore && (
        <div className={styles.loadMoreContainer}>
          <button
            type="button"
            className={styles.loadMoreButton}
            onClick={loadMore}
            disabled={isLoading}
          >
            {isLoading ? 'carregando...' : 'ver mais'}
          </button>
        </div>
      )}

      {!hasMore && items.length > 0 && (
        <div className={styles.endMessage}>
          <span>
            mostrando {items.length} de {totalCount} roasts
          </span>
        </div>
      )}
    </div>
  );
}
