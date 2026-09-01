import type { ParseKeys } from 'i18next';
import type { LinkProps } from '@tanstack/react-router';
import type { LucideIcon } from 'lucide-react';
import { ClipboardList, House, SquarePen } from 'lucide-react';

type BottomNavLabelKey = Extract<
  ParseKeys<'common'>,
  `nav.disposition.${string}` | `nav.panel.${string}`
>;

type BottomNavLink = {
  labelKey: BottomNavLabelKey;
  to: NonNullable<LinkProps['to']>;
  icon: LucideIcon;
};

const BOTTOM_NAV_LINKS: readonly BottomNavLink[] = [
  {
    labelKey: 'nav.disposition.availability',
    to: '/availability',
    icon: SquarePen,
  },
  {
    labelKey: 'nav.disposition.home',
    to: '/home',
    icon: House,
  },
  {
    labelKey: 'nav.disposition.mySchedule',
    to: '/my-schedule',
    icon: ClipboardList,
  },
];

export { BOTTOM_NAV_LINKS };
export type { BottomNavLink };
