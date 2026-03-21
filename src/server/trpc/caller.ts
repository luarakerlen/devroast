import 'server-only';
import { createCallerFactory, createTRPCContext } from '~/server/api/init';
import { appRouter } from '~/server/api/root';

export const createCaller = createCallerFactory(appRouter);
export const createContext = createTRPCContext;
