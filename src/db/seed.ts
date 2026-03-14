import 'dotenv/config';
import { faker } from '@faker-js/faker';
import { db } from './config';
import { analysisItems, roasts } from './schema';

const languages = [
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
];

const modes = ['normal', 'sarcastic'] as const;
const providers = ['openai', 'anthropic', 'ollama', 'lm_studio'] as const;
const analysisTypes = [
  'bad_practice',
  'security',
  'performance',
  'code_smell',
  'bug',
] as const;
const severities = ['low', 'medium', 'high'] as const;

const codeTemplates: Record<string, string[]> = {
  javascript: [
    'function bad() { var x = 1; return x; }',
    'const arr = []; for(var i=0; i<100; i++) { arr.push(i); }',
    'if(condition) doSomething(); else doOtherThing();',
    'try { } catch(e) { console.log(e); }',
    'setTimeout(function() { }, 0);',
  ],
  python: [
    'def bad_func(): x = 1 return x',
    'for i in range(100): arr.append(i)',
    'if condition: do_something()',
    'try: pass except: print(e)',
    'from os import *',
  ],
  java: [
    'public void bad() { int x = 1; return x; }',
    'for(int i=0; i<100; i++) { list.add(i); }',
    'if(condition) doSomething(); else doOther();',
    'try { } catch(Exception e) { e.printStackTrace(); }',
    'Vector v = new Vector();',
  ],
  typescript: [
    'function bad(): any { var x = 1; return x; }',
    'const arr: any[] = [];',
    'if(condition) doSomething() as any;',
    'try { } catch(e: any) { console.log(e); }',
    'let x: any = {};',
  ],
};

const defaultCode = [
  'function test() { return 1; }',
  'const x = 1;',
  'if (true) { }',
];

const roastContents = [
  'Este código tem problemas sérios de performance. Use let ao invés de var.',
  'Isso é um pesadelo de manutenção. Por que não usa classes?',
  'Security risk: nunca use eval() em produção!',
  'Código bonito, mas poderia usar arrow functions.',
  'Isso nemcompila. Verifique a sintaxe.',
  'Que horror! Isso precisa de refatoração urgente.',
  'Nem o ChatGPT escreveria isso assim.',
  'Parabéns, você reinventou a roda. Use bibliotecas existentes.',
  'Isso vai dar problema em produção. Confia.',
  'Código limpo, mas faltou tratamento de erros.',
];

const analysisDescriptions = [
  'Uso de var ao invés de let/const',
  'Loop desnecessário, use map/filter',
  'Código morto detectado',
  'Nomes de variáveis confusos',
  'Falta tratamento de exceção',
  'Variável não utilizada',
  'Função muito longa',
  'Duplicação de código',
  'Magic numbers no código',
  'Nesting muito profundo',
  'SQL injection vulnerability',
  'XSS vulnerability',
  'Memory leak detectado',
  'Requisito HTTP desnecessário',
  'Recursão sem caso base',
];

function getCode(lang: string): string {
  const templates = codeTemplates[lang] || defaultCode;
  return faker.helpers.arrayElement(templates);
}

function generateAnalysisForRoast(roastId: string) {
  const count = faker.number.int({ min: 1, max: 5 });
  const items = [];

  for (let i = 0; i < count; i++) {
    items.push({
      id: crypto.randomUUID(),
      roastId,
      lineNumber: faker.number.int({ min: 1, max: 50 }),
      type: faker.helpers.arrayElement(analysisTypes),
      description: faker.helpers.arrayElement(analysisDescriptions),
      severity: faker.helpers.arrayElement(severities),
    });
  }

  return items;
}

async function seed() {
  console.log('🌱 Starting seed...');

  await db.delete(analysisItems).execute();
  await db.delete(roasts).execute();
  console.log('🗑️  Cleared existing data');

  const roastRecords = [];
  const analysisRecords = [];

  for (let i = 0; i < 100; i++) {
    const lang = faker.helpers.arrayElement(languages);
    const mode = faker.helpers.arrayElement(modes);
    const provider = faker.helpers.arrayElement(providers);
    const model = `${provider}-${faker.helpers.arrayElement(['gpt-4', 'claude-3', 'llama-3', 'codellama'])}`;

    const roast = {
      id: crypto.randomUUID(),
      code: getCode(lang),
      language: lang,
      content: faker.helpers.arrayElement(roastContents),
      score: faker.number.int({ min: 10, max: 100 }),
      mode,
      provider,
      model,
      createdAt: faker.date.past({ years: 1 }),
    };

    roastRecords.push(roast);
    analysisRecords.push(...generateAnalysisForRoast(roast.id));
  }

  console.log(`📝 Inserting ${roastRecords.length} roasts...`);
  await db.insert(roasts).values(roastRecords).execute();

  console.log(`📝 Inserting ${analysisRecords.length} analysis items...`);
  await db.insert(analysisItems).values(analysisRecords).execute();

  console.log('✅ Seed completed!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
