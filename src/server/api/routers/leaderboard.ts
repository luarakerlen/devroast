import { count, asc, eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '@/db';
import { analysisItems, roasts } from '@/db/schema';
import { baseProcedure, createTRPCRouter } from '../init';

const filenameTemplates: Record<string, string[]> = {
  javascript: [
    'callback_hell.js',
    'undefined_is_not_a_function.js',
    'event_loop_madness.js',
    'memory_leak_bingo.js',
    'sync_await_hell.js',
  ],
  typescript: [
    'any_type_master.ts',
    'interface_hell.ts',
    'generic_madness.ts',
    'type_assertion_party.ts',
    '鸭子类型.ts',
  ],
  python: [
    'from_os_import_star.py',
    'global_variable_fun.py',
    'bare_except.py',
    'monkey_patch_bomb.py',
    'list_append_loop.py',
  ],
  java: [
    'null_pointer_factory.java',
    'vector_stack_overflow.java',
    'synchronized_everything.java',
    'system_exit_here.java',
    'catch_all_the_things.java',
  ],
  go: [
    'goroutine_leak.go',
    'nil_pointer_panic.go',
    'error_ignored.go',
    'context_deadline_exceeded.go',
    'defer_close_disaster.go',
  ],
  rust: [
    'unwrap_everything.rs',
    'borrow_checker_defeats.rs',
    'unsafe_block_party.rs',
    'lifetime_mystery.rs',
    'arc_mutex_arc_arc.rs',
  ],
};

function getRandomFilename(language: string): string {
  const templates = filenameTemplates[language] || ['mystery_code.txt'];
  return templates[Math.floor(Math.random() * templates.length)];
}

function getVerdict(score: number): string {
  if (score >= 90) return 'absolute_disaster';
  if (score >= 80) return 'catastrophic_code';
  if (score >= 70) return 'needs_serious_help';
  if (score >= 60) return 'room_for_improvement';
  if (score >= 50) return 'not_great';
  return 'could_be_worse';
}

export const leaderboardRouter = createTRPCRouter({
  getTopShame: baseProcedure.query(async () => {
    try {
      const [results, [totalResult]] = await Promise.all([
        db
          .select({
            id: roasts.id,
            score: roasts.score,
            language: roasts.language,
            code: roasts.code,
          })
          .from(roasts)
          .orderBy(asc(roasts.score))
          .limit(3),
        db.select({ count: count() }).from(roasts),
      ]);

      return {
        items: results.map((r, index) => ({
          rank: index + 1,
          id: r.id,
          score: r.score / 10,
          code: r.code,
          filename: getRandomFilename(r.language),
          language: r.language.charAt(0).toUpperCase() + r.language.slice(1),
        })),
        totalCount: totalResult?.count ?? 0,
      };
    } catch {
      return {
        items: [],
        totalCount: 0,
      };
    }
  }),

  getAll: baseProcedure
    .input(
      z.object({
        offset: z.number().default(0),
        limit: z.number().default(20),
      })
    )
    .query(async ({ input }) => {
      try {
        const { offset, limit } = input;
        const [results, [totalResult]] = await Promise.all([
          db
            .select({
              id: roasts.id,
              score: roasts.score,
              language: roasts.language,
              code: roasts.code,
            })
            .from(roasts)
            .orderBy(asc(roasts.score))
            .limit(limit)
            .offset(offset),
          db.select({ count: count() }).from(roasts),
        ]);

        const totalCount = totalResult?.count ?? 0;

        return {
          items: results.map((r, index) => ({
            rank: offset + index + 1,
            id: r.id,
            score: r.score / 10,
            code: r.code,
            filename: getRandomFilename(r.language),
            language: r.language.charAt(0).toUpperCase() + r.language.slice(1),
          })),
          totalCount,
          hasMore: offset + limit < totalCount,
        };
      } catch {
        return {
          items: [],
          totalCount: 0,
          hasMore: false,
        };
      }
    }),
});

export const roastRouter = createTRPCRouter({
  getById: baseProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ input }) => {
      try {
        const [roastResult] = await db
          .select()
          .from(roasts)
          .where(eq(roasts.id, input.id));

        if (!roastResult) {
          return null;
        }

        const items = await db
          .select()
          .from(analysisItems)
          .where(eq(analysisItems.roastId, input.id));

        const analysis = items.map((item) => ({
          title:
            item.type === 'bad_practice'
              ? 'Bad Practice'
              : item.type === 'security'
                ? 'Security Issue'
                : item.type === 'performance'
                  ? 'Performance Problem'
                  : item.type === 'code_smell'
                    ? 'Code Smell'
                    : 'Bug Detected',
          description: item.description,
          severity: item.severity,
          lineNumber: item.lineNumber,
          type: item.type,
        }));

        return {
          id: roastResult.id,
          score: roastResult.score / 10,
          verdict: getVerdict(roastResult.score),
          quote: roastResult.content,
          language:
            roastResult.language.charAt(0).toUpperCase() +
            roastResult.language.slice(1),
          code: roastResult.code,
          lineCount: roastResult.code.split('\n').length,
          analysis,
          mode: roastResult.mode,
          provider: roastResult.provider,
          model: roastResult.model,
          createdAt: roastResult.createdAt.toISOString(),
        };
      } catch {
        return null;
      }
    }),
});
