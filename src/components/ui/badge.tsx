import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const badge = tv(
  {
    base: 'inline-flex items-center gap-2 font-mono text-xs',
    variants: {
      variant: {
        critical: 'text-red-500',
        warning: 'text-amber-500',
        good: 'text-emerald-500',
      },
    },
    defaultVariants: {
      variant: 'good',
    },
  },
  {
    twMerge: false,
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badge> {
  label: string;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, label, ...props }, ref) => {
    return (
      <div className={badge({ variant, className })} ref={ref} {...props}>
        <span
          className={badge({ variant, className: 'w-2 h-2 rounded-full' })}
        />
        <span>{label}</span>
      </div>
    );
  }
);
Badge.displayName = 'Badge';

export { Badge };
