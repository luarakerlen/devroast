import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const button = tv(
  {
    base: 'inline-flex items-center justify-center font-mono font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    variants: {
      variant: {
        primary:
          'bg-emerald-500 text-zinc-950 hover:bg-emerald-600 dark:text-zinc-950',
        secondary:
          'bg-zinc-200 text-zinc-950 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700',
        outline:
          'border border-zinc-300 text-zinc-900 bg-transparent hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800',
        ghost:
          'bg-transparent text-zinc-900 hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
        link: 'bg-transparent text-zinc-500 hover:text-zinc-900 underline-offset-4 hover:underline dark:hover:text-zinc-100',
      },
      size: {
        sm: 'py-1 px-3 text-xs',
        md: 'py-2.5 px-6 text-sm',
        lg: 'py-3 px-8 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
  {
    twMerge: false,
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={button({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
