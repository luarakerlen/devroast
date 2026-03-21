import { avg, count } from 'drizzle-orm';
import { db } from '@/db';
import { roasts } from '@/db/schema';
import { baseProcedure, createTRPCRouter } from '../init';

export const metricsRouter = createTRPCRouter({
  getStats: baseProcedure.query(async () => {
    try {
      const [totalResult] = await db.select({ count: count() }).from(roasts);
      const [avgResult] = await db
        .select({ avg: avg(roasts.score) })
        .from(roasts);

      const totalRoasted = totalResult?.count ?? 0;
      const avgScore = avgResult?.avg ? Number(avgResult.avg) / 10 : 0;

      return {
        totalRoasted,
        avgScore: Math.round(avgScore * 10) / 10,
      };
    } catch {
      return {
        totalRoasted: 0,
        avgScore: 0,
      };
    }
  }),
});
