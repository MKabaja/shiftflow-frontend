import { focusStyles } from '@/shared/lib/styles/focusStyles.ts';

const navStyles: string =
  'z-bottom-nav bg-bg-nav border-border shadow-nav-top sticky bottom-0 flex min-h-16 w-full items-center rounded-t-lg border-t pb-[env(safe-area-inset-bottom)]';

const listStyles: string = 'flex w-full items-center';

const itemStyles: string = 'relative flex-1';

const linkStyles: string =
  'text-text-muted text-body-sm relative flex w-full flex-col items-center gap-1 rounded-md py-2 transition-colors duration-200' +
  focusStyles;

const linkActiveStyles: string = 'text-accent';

const indicatorStyles: string =
  'shadow-nm-raised-sm border-border bg-bg-offset pointer-events-none absolute -top-3 left-[calc(50%-1.5rem)] size-12 rounded-full border';

const iconBoxStyles: string =
  'flex size-6 items-center justify-center transition-transform duration-200 motion-reduce:transition-none';

const iconBoxActiveStyles: string = '-translate-y-2';

const iconActiveStyles: string = 'drop-shadow-glow-accent';

export {
  navStyles,
  listStyles,
  itemStyles,
  linkStyles,
  linkActiveStyles,
  indicatorStyles,
  iconBoxStyles,
  iconBoxActiveStyles,
  iconActiveStyles,
};
