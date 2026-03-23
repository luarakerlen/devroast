import { createTRPCRouter } from './init';
import { leaderboardRouter, roastRouter } from './routers/leaderboard';
import { metricsRouter } from './routers/metrics';

export const appRouter = createTRPCRouter({
  leaderboard: leaderboardRouter,
  metrics: metricsRouter,
  roast: roastRouter,
});

export type AppRouter = typeof appRouter;
