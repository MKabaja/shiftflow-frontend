import { cn } from '@/shared/lib/helpers/cn.ts';

type InputStyleProps = {
  hasError?: boolean;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
};

export function InputStyles({ hasError, hasLeftIcon, hasRightIcon }: InputStyleProps): string {
  return cn(
    'h-10 w-full rounded-md bg-bg-offset text-sm text-text-primary shadow-nm-inset transition-all border border-border placeholder:text-text-muted',
    hasLeftIcon ? 'pl-9' : 'px-3.5',
    hasRightIcon && 'pr-9',
    hasError
      ? 'border-danger'
      : 'focus-visible:border-accent-dark focus-visible:shadow-[0_0_0_3px_rgba(201,163,71,0.15)]',
  );
}
