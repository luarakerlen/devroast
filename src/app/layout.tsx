import type { Metadata } from 'next';
import Link from 'next/link';
import './style/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { TRPCProvider } from '~/server/trpc/client';
import styles from './style/navbar.module.css';

export const metadata: Metadata = {
  title: 'DevRoast',
  description: 'Code roasting platform',
};

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logoLink}>
        <span className={styles.logoPrompt}>&gt;</span>
        <span className={styles.logoText}>devroast</span>
      </Link>
      <Link href="/leaderboard" className={styles.navLink}>
        leaderboard
      </Link>
    </nav>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCProvider>
            <Navbar />
            <main>{children}</main>
          </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
