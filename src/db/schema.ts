import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const roastModeEnum = pgEnum('roast_mode', ['normal', 'sarcastic']);

export const aiProviderEnum = pgEnum('ai_provider', [
  'openai',
  'anthropic',
  'ollama',
  'lm_studio',
]);

export const programmingLanguageEnum = pgEnum('programming_language', [
  'javascript',
  'typescript',
  'python',
  'java',
  'csharp',
  'go',
  'rust',
  'php',
  'ruby',
  'swift',
  'kotlin',
  'cpp',
  'c',
  'html',
  'css',
  'sql',
  'bash',
  'other',
]);

export const analysisTypeEnum = pgEnum('analysis_type', [
  'bad_practice',
  'security',
  'performance',
  'code_smell',
  'bug',
]);

export const severityEnum = pgEnum('severity', ['low', 'medium', 'high']);

export const roasts = pgTable('roasts', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: text('code').notNull(),
  language: varchar('language', { length: 50 }).notNull(),
  content: text('content').notNull(),
  score: integer('score').notNull(),
  mode: roastModeEnum('mode').notNull(),
  provider: aiProviderEnum('provider').notNull(),
  model: varchar('model', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const analysisItems = pgTable('analysis_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  roastId: uuid('roast_id').notNull(),
  lineNumber: integer('line_number').notNull(),
  type: analysisTypeEnum('type').notNull(),
  description: text('description').notNull(),
  severity: severityEnum('severity').notNull(),
});
