# UI Components Pattern Guide

## Overview

This document outlines the patterns and conventions for creating UI components in this project.

## Tech Stack

- **Styling**: Tailwind CSS
- **Variants**: [tailwind-variants](https://tailwind-variants.org)
- **Utilities**: clsx (for conditional classes)
- **Framework**: React with TypeScript
- **Next.js**: App Router with `@/*` import alias

## Component Structure

All UI components are located in `src/components/ui/`.

### File Naming

- Use kebab-case: `button.tsx`, `input.tsx`, `card.tsx`
- One component per file
- Named exports only (never default exports)

### Component Template

```tsx
import { tv, type VariantProps } from "tailwind-variants";
import * as React from "react";

const componentName = tv(
  {
    base: "base classes shared across all variants",
    variants: {
      variant: {
        default: "classes for default variant",
        secondary: "classes for secondary variant",
        outline: "classes for outline variant",
      },
      size: {
        sm: "classes for small size",
        md: "classes for medium size",
        lg: "classes for large size",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        size: "lg",
        className: "classes applied when both conditions are true",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
  {
    twMerge: false, // Required when using tailwind-variants
  }
);

export interface ComponentNameProps
  extends React.ElementRef<"element-type">,
    VariantProps<typeof componentName> {
  // Additional custom props
}

const ComponentName = React.forwardRef<
  HTMLButtonElement,
  ComponentNameProps
>(({ className, variant, size, ...props }, ref) => {
  return (
    <element-type
      className={componentName({ variant, size, className })}
      ref={ref}
      {...props}
    />
  );
});
ComponentName.displayName = "ComponentName";

export { ComponentName };
```

## Key Patterns

### 1. Use tailwind-variants (NOT twMerge)

```tsx
// ✅ CORRECT - Use tailwind-variants
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "...",
  variants: { ... },
}, { twMerge: false });

// ❌ WRONG - Don't use twMerge for variant classes
import { twMerge } from "tailwind-merge";
```

### 2. Extend Native HTML Props

Always extend the appropriate native element props:

```tsx
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof input> {}
```

### 3. Named Exports Only

```tsx
// ✅ CORRECT
export { Button };

// ❌ WRONG
export default Button;
```

### 4. Import from @/ path

```tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

### 5. ForwardRef Pattern

Always use forwardRef for ref forwarding:

```tsx
const ComponentName = React.forwardRef<HTMLElementType, Props>(
  ({ className, ...props }, ref) => {
    return <element-type ref={ref} {...props} />;
  }
);
ComponentName.displayName = "ComponentName";
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run check` - Run Biome linter/formatter
- `npm run format` - Format code with Biome
