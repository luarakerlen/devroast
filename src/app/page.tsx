'use client';

import { useState } from 'react';
import { ActionsBar } from '@/components/home/actions-bar/actions-bar';
import { CodeInputArea } from '@/components/home/code-input-area/code-input-area';
import { FooterHint } from '@/components/home/footer-hint/footer-hint';
import { HeroTitle } from '@/components/home/hero-title/hero-title';
import { LeaderboardPreview } from '@/components/home/leaderboard-preview/leaderboard-preview';
import styles from './style/home.module.css';

export default function Home() {
  const [code, setCode] = useState('');
  const [roastMode, setRoastMode] = useState(true);
  const [language, setLanguage] = useState<string | null>(null);

  return (
    <div className={styles.main}>
      <HeroTitle />
      <CodeInputArea
        code={code}
        onCodeChange={setCode}
        language={language}
        onLanguageChange={setLanguage}
      />
      <ActionsBar
        code={code}
        roastMode={roastMode}
        onRoastModeChange={setRoastMode}
      />
      <FooterHint />
      <div className={styles.spacer} />
      <LeaderboardPreview />
      <div className={styles.spacer} />
    </div>
  );
}
