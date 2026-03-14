import * as React from 'react';
import styles from './toggle.module.css';

export interface ToggleProps {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  label: string;
  className?: string;
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ pressed, onPressedChange, label, className }, ref) => {
    return (
      <div className={`${styles.container} ${className || ''}`}>
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={pressed}
          onClick={() => onPressedChange(!pressed)}
          className={`${styles.button} ${pressed ? styles.buttonOn : styles.buttonOff}`}
        >
          <span
            className={`${styles.knob} ${pressed ? styles.knobOn : styles.knobOff}`}
          />
        </button>
        <span
          className={`${styles.label} ${pressed ? styles.labelOn : styles.labelOff}`}
        >
          {label}
        </span>
      </div>
    );
  }
);
Toggle.displayName = 'Toggle';

export { Toggle };
