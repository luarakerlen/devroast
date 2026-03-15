import {
	CodeBlockContent,
	CodeBlockRoot,
} from '@/components/ui/code-block/code-block';
import styles from './leaderboard.module.css';

const leaderboardData = [
	{
		rank: '#1',
		username: 'dev_gone_wrong',
		score: '2.1',
		language: 'JavaScript',
		filename: 'nested_callback_hell.js',
		code: `function processData(data) {
  if (data) {
    if (data.value) {
      if (data.value.nested) {
        return callback(callback(callback(
          data.value.nested.deep
        )));
      }
    }
  }
  return null;
}`,
	},
	{
		rank: '#2',
		username: 'spaghetti_code',
		score: '3.4',
		language: 'Python',
		filename: 'magic_numbers.py',
		code: `def calculate():
    x = 42
    y = x * 2
    z = y + 10
    result = z - 5
    return result  # magic numbers everywhere`,
	},
	{
		rank: '#3',
		username: 'sql_injection_king',
		score: '3.8',
		language: 'Java',
		filename: 'sql_injection.exe',
		code: `String query = "SELECT * FROM users WHERE id = " + userId;
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery(query);`,
	},
	{
		rank: '#4',
		username: 'copy_paste_pro',
		score: '4.1',
		language: 'Dart',
		filename: 'copy_paste_stackoverflow.dart',
		code: `// I don't know what this does but it works
// StackOverflow said to use this
var data = JSON.parse(jsonString);`,
	},
	{
		rank: '#5',
		username: 'function_hater',
		score: '4.5',
		language: 'C#',
		filename: 'one_function_10k_lines.cs',
		code: `public void DoEverything() {
  // This is the only function in the entire file
  // It does everything: validation, processing, IO, etc.
}`,
	},
];

export const metadata = {
	title: 'Shame Leaderboard | DevRoast',
	description: 'The most roasted code on the internet, ranked by shame.',
};

export default function LeaderboardPage() {
	return (
		<div className={styles.container}>
			<div className={styles.heroSection}>
				<div className={styles.titleRow}>
					<span className={styles.titlePrompt}>{'>'}</span>
					<span className={styles.titleText}>shame_leaderboard</span>
				</div>
				<span className={styles.subtitle}>
					{'// the most roasted code on the internet'}
				</span>
				<div className={styles.statsRow}>
					<span className={styles.stat}>2,847 submissions</span>
					<span className={styles.statDot}>·</span>
					<span className={styles.stat}>avg score: 4.2/10</span>
				</div>
			</div>

			<div className={styles.entries}>
				{leaderboardData.map((entry) => (
					<div key={entry.rank} className={styles.entry}>
						<div className={styles.metaRow}>
							<div className={styles.metaLeft}>
								<span className={styles.rank}>{entry.rank}</span>
								<span className={styles.username}>{entry.username}</span>
							</div>
							<div className={styles.metaRight}>
								<span className={styles.score}>{entry.score}/10</span>
								<span className={styles.language}>{entry.language}</span>
							</div>
						</div>
						<CodeBlockRoot className={styles.codeBlock}>
							<CodeBlockContent
								code={entry.code}
								language={entry.language.toLowerCase()}
							/>
						</CodeBlockRoot>
					</div>
				))}
			</div>
		</div>
	);
}
