'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/ui/code-block';
import { DiffLine } from '@/components/ui/diff-line';
import { ScoreRing } from '@/components/ui/score-ring';
import { Toggle } from '@/components/ui/toggle';

const buttonVariants = [
  'primary',
  'secondary',
  'outline',
  'ghost',
  'destructive',
  'link',
] as const;
const sizes = ['sm', 'md', 'lg'] as const;

const sampleCode = `function calculateTotal(items) {
  let total = 0;
  for (var i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}`;

export default function ComponentsPage() {
  const [toggleOn, setToggleOn] = useState(true);
  const [toggleOff, setToggleOff] = useState(false);

  return (
    <main className="space-y-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold font-mono">Components</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          UI component library showcase
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold font-mono">Button</h2>

        <div className="space-y-6 p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
          {buttonVariants.map((variant) => (
            <div key={variant} className="space-y-3">
              <h3 className="text-sm font-medium text-zinc-500 uppercase">
                {variant}
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                {sizes.map((size) => (
                  <Button key={size} variant={variant} size={size}>
                    {variant === 'link' ? 'View all >>' : `Button ${size}`}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold font-mono">Badge</h2>

        <div className="space-y-6 p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-wrap items-center gap-6">
            <Badge variant="critical" label="critical" />
            <Badge variant="warning" label="warning" />
            <Badge variant="good" label="good" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold font-mono">Toggle</h2>

        <div className="space-y-6 p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-wrap items-center gap-8">
            <Toggle
              pressed={toggleOn}
              onPressedChange={setToggleOn}
              label="roast mode"
            />
            <Toggle
              pressed={toggleOff}
              onPressedChange={setToggleOff}
              label="roast mode"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold font-mono">Code Block</h2>

        <div className="space-y-6">
          <CodeBlock
            code={sampleCode}
            language="javascript"
            filename="calculate.js"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold font-mono">Diff Line</h2>

        <div className="space-y-6 p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <div className="w-[560px]">
            <DiffLine type="removed" prefix="-" code="var total = 0;" />
            <DiffLine type="added" prefix="+" code="const total = 0;" />
            <DiffLine
              type="context"
              prefix=" "
              code="for (let i = 0; i < items.length; i++) {"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold font-mono">Score Ring</h2>

        <div className="space-y-6 p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-wrap items-center gap-8">
            <ScoreRing score={10} maxScore={10} />
            <ScoreRing score={7} maxScore={10} />
            <ScoreRing score={3.5} maxScore={10} />
            <ScoreRing score={0} maxScore={10} />
          </div>
        </div>
      </section>
    </main>
  );
}
