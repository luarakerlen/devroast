'use client';

import { useState } from 'react';
import { BadgeDot, BadgeLabel, BadgeRoot } from '@/components/ui/badge/badge';
import { Button } from '@/components/ui/button/button';
import {
  CardDescription,
  CardHeader,
  CardRoot,
  CardTitle,
} from '@/components/ui/card/card';
import {
  DiffLineContent,
  DiffLinePrefix,
  DiffLineRoot,
} from '@/components/ui/diff-line/diff-line';
import { ScoreRing } from '@/components/ui/score-ring/score-ring';
import {
  TableRow,
  TableRowCode,
  TableRowLang,
  TableRowRank,
  TableRowScore,
} from '@/components/ui/table-row/table-row';
import { Toggle } from '@/components/ui/toggle/toggle';
import { CodeBlockDemo } from './code-block-demo/code-block-demo';
import styles from './components.module.css';

const buttonVariants = [
  'primary',
  'secondary',
  'outline',
  'ghost',
  'destructive',
  'link',
] as const;
const sizes = ['sm', 'md', 'lg'] as const;

export default function ComponentsPage() {
  const [toggleOn, setToggleOn] = useState(true);
  const [toggleOff, setToggleOff] = useState(false);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Components</h1>
          <p className={styles.description}>UI component library showcase</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Button</h2>
          <div className={styles.componentShowcase}>
            {buttonVariants.map((variant) => (
              <div key={variant} className={styles.buttonGroup}>
                <h3 className={styles.buttonGroupTitle}>{variant}</h3>
                <div className={styles.buttonRow}>
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

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Badge</h2>
          <div className={styles.componentShowcase}>
            <div className={styles.badgeRow}>
              <BadgeRoot variant="critical">
                <BadgeDot variant="critical" />
                <BadgeLabel>critical</BadgeLabel>
              </BadgeRoot>
              <BadgeRoot variant="warning">
                <BadgeDot variant="warning" />
                <BadgeLabel>warning</BadgeLabel>
              </BadgeRoot>
              <BadgeRoot variant="good">
                <BadgeDot variant="good" />
                <BadgeLabel>good</BadgeLabel>
              </BadgeRoot>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Toggle</h2>
          <div className={styles.componentShowcase}>
            <div className={styles.toggleRow}>
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

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Code Block</h2>
          <CodeBlockDemo />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Diff Line</h2>
          <div className={styles.componentShowcase}>
            <div className={styles.diffLineContainer}>
              <DiffLineRoot type="removed">
                <DiffLinePrefix type="removed">-</DiffLinePrefix>
                <DiffLineContent type="removed">var total = 0;</DiffLineContent>
              </DiffLineRoot>
              <DiffLineRoot type="added">
                <DiffLinePrefix type="added">+</DiffLinePrefix>
                <DiffLineContent type="added">const total = 0;</DiffLineContent>
              </DiffLineRoot>
              <DiffLineRoot type="context">
                <DiffLinePrefix type="context"> </DiffLinePrefix>
                <DiffLineContent type="context">
                  for (let i = 0; i &lt; items.length; i++) {'{'}
                </DiffLineContent>
              </DiffLineRoot>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Score Ring</h2>
          <div className={styles.componentShowcase}>
            <div className={styles.scoreRingRow}>
              <ScoreRing score={10} maxScore={10} />
              <ScoreRing score={7} maxScore={10} />
              <ScoreRing score={3.5} maxScore={10} />
              <ScoreRing score={0} maxScore={10} />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Card</h2>
          <div className={styles.componentShowcase}>
            <div className={styles.cardRow}>
              <CardRoot>
                <CardHeader variant="critical">
                  <span>critical</span>
                </CardHeader>
                <CardTitle>using var instead of const/let</CardTitle>
                <CardDescription>
                  the var keyword is function-scoped rather than block-scoped,
                  which can lead to unexpected behavior and bugs.
                </CardDescription>
              </CardRoot>
              <CardRoot>
                <CardHeader variant="warning">
                  <span>warning</span>
                </CardHeader>
                <CardTitle>missing error handling</CardTitle>
                <CardDescription>
                  this function does not handle potential errors or edge cases
                  properly.
                </CardDescription>
              </CardRoot>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Table Row</h2>
          <div className={styles.componentShowcase}>
            <div className={styles.tableRowContainer}>
              <TableRow>
                <TableRowRank>#1</TableRowRank>
                <TableRowScore>2.1</TableRowScore>
                <TableRowCode>nested_callback_hell.js</TableRowCode>
                <TableRowLang>javascript</TableRowLang>
              </TableRow>
              <TableRow>
                <TableRowRank>#2</TableRowRank>
                <TableRowScore>3.4</TableRowScore>
                <TableRowCode>magic_numbers.py</TableRowCode>
                <TableRowLang>python</TableRowLang>
              </TableRow>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
