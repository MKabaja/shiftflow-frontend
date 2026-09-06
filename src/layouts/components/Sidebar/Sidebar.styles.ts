import { focusStyles } from '@/shared/lib/styles/focusStyles.ts';

const spacerStyles: string =
  "group/sidebar relative w-sidebar-collapsed shrink-0 after:absolute after:inset-y-0 after:left-full after:w-4 after:content-['']";

const panelStyles: string =
  'bg-bg-nav border-border z-sidebar fixed inset-y-0 left-0 flex w-sidebar-collapsed flex-col gap-6 overflow-hidden border-r px-2 py-6 transition-[width] delay-200 duration-[250ms] ease-out group-hover/sidebar:w-sidebar group-hover/sidebar:delay-0 group-focus-within/sidebar:w-sidebar group-focus-within/sidebar:delay-0 motion-reduce:transition-none';

const logoLinkStyles: string = 'flex h-10 shrink-0 items-center rounded-md px-2.5' + focusStyles;

const listStyles: string = 'flex flex-col gap-1';

const itemStyles: string = 'relative';

const linkStyles: string =
  'text-text-muted text-body-md flex h-11 items-center gap-3 rounded-md px-2.5 transition-colors duration-200 hover:bg-white/4 hover:text-text-primary motion-reduce:transition-none' +
  focusStyles;

const linkActiveStyles: string = 'bg-bg-offset text-text-primary';

const indicatorStyles: string =
  'bg-accent pointer-events-none absolute inset-y-1 left-0 w-[3px] rounded-full';

const iconStyles: string = 'shrink-0';

const labelStyles: string =
  'whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100 group-focus-within/sidebar:opacity-100 motion-reduce:transition-none';

const footerStyles: string = 'mt-auto flex flex-col gap-2';

const userStyles: string = 'flex h-11 items-center gap-3 px-1.5';

const userNameStyles: string = 'text-text-muted text-body-sm ' + labelStyles;

export {
  spacerStyles,
  panelStyles,
  logoLinkStyles,
  listStyles,
  itemStyles,
  linkStyles,
  linkActiveStyles,
  indicatorStyles,
  iconStyles,
  labelStyles,
  footerStyles,
  userStyles,
  userNameStyles,
};
