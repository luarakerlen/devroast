import { FooterHint } from '@/components/home/footer-hint/footer-hint';
import { HeroTitle } from '@/components/home/hero-title/hero-title';
import { LeaderboardPreview } from '@/components/home/leaderboard-preview/leaderboard-preview';
import { HomeClient } from './home-client';
import styles from './style/home.module.css';

export default function Home() {
  return (
    <div className={styles.main}>
      <HeroTitle />
      <HomeClient />
      <FooterHint />
      <div className={styles.spacer} />
      <LeaderboardPreview />
      <div className={styles.spacer} />
    </div>
  );
}
