import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const diffLine = tv(
  {
    base: 'flex font-mono text-[13px]',
    variants: {
      type: {
        removed: 'bg-[#1A0A0A]',
        added: 'bg-[#0A1A0F]',
        context: '',
      },
    },
    defaultVariants: {
      type: 'context',
    },
  },
  { twMerge: false }
);

const prefixColors = {
  removed: 'text-red-500',
  added: 'text-emerald-500',
  context: 'text-zinc-500',
};

const codeColors = {
  removed: 'text-zinc-400',
  added: 'text-zinc-100',
  context: 'text-zinc-400',
};

export interface DiffLineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof diffLine> {
  prefix: string;
  code: string;
}

const DiffLine = React.forwardRef<HTMLDivElement, DiffLineProps>(
  ({ className, type = 'context', prefix, code, ...props }, ref) => {
    return (
      <div
        className={`${diffLine({ type })} px-4 py-2 gap-2 ${className || ''}`}
        ref={ref}
        {...props}
      >
        <span className={`w-4 ${prefixColors[type]}`}>{prefix}</span>
        <span className={codeColors[type]}>{code}</span>
      </div>
    );
  }
);
DiffLine.displayName = 'DiffLine';

export { DiffLine };
