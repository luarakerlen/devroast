import { Button } from '@/components/ui/button/button';
import { Toggle } from '@/components/ui/toggle/toggle';
import styles from './actions-bar.module.css';

export interface ActionsBarProps {
  code: string;
  roastMode: boolean;
  onRoastModeChange: (value: boolean) => void;
}

export function ActionsBar({
  code,
  roastMode,
  onRoastModeChange,
}: ActionsBarProps) {
  const hasCode = code.trim().length > 0;

  return (
    <div className={styles.container}>
      <div className={styles.leftActions}>
        <Toggle
          pressed={roastMode}
          onPressedChange={onRoastModeChange}
          label="roast mode"
        />
        <span className={styles.hint}>{`// maximum sarcasm enabled`}</span>
      </div>
      <Button
        variant="primary"
        size="md"
        disabled={!hasCode}
        className={styles.submitButton}
      >
        $ roast_my_code
      </Button>
    </div>
  );
}
