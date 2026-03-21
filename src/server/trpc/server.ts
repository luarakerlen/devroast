import 'server-only';
import { QueryClient } from '@tanstack/react-query';
import { createHydrationHelpers } from '@trpc/react-query/rsc';
import { cache } from 'react';
import { createCallerFactory, createTRPCContext } from '~/server/api/init';
import { appRouter } from '~/server/api/root';

export const getQueryClient = cache(() => new QueryClient());
const caller = createCallerFactory(appRouter)(createTRPCContext);

export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
  caller,
  getQueryClient
);
