import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as React from 'react';
import { tv } from 'tailwind-variants';

const toggle = tv({
  base: 'flex items-center gap-3 cursor-pointer',
});

export interface ToggleProps {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  label: string;
  className?: string;
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ pressed, onPressedChange, label, className }, ref) => {
    return (
      <div className={toggle({ className })}>
        <TogglePrimitive.Root
          ref={ref}
          pressed={pressed}
          onPressedChange={onPressedChange}
          className="w-10 h-[22px] rounded-full p-[3px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-emerald-500 data-[state=off]:border data-[state=off]:border-zinc-700 data-[state=off]:bg-transparent"
        >
          <span
            className={`block w-4 h-4 rounded-full transition-transform ${
              pressed
                ? 'translate-x-[18px] bg-zinc-950'
                : 'translate-x-0 bg-zinc-500'
            }`}
          />
        </TogglePrimitive.Root>
        <span className="text-xs font-mono">{label}</span>
      </div>
    );
  }
);
Toggle.displayName = 'Toggle';

export { Toggle };
