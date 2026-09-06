import type { ParseKeys } from 'i18next';
import type { LinkProps } from '@tanstack/react-router';
import type { LucideIcon } from 'lucide-react';
import {
  Briefcase,
  CalendarDays,
  ClipboardList,
  House,
  Newspaper,
  Settings,
  SquarePen,
  Users,
} from 'lucide-react';

type NavLabelKey = Extract<
  ParseKeys<'common'>,
  `nav.panel.${string}` | `nav.disposition.${string}` | 'nav.settings'
>;

type NavLink = {
  labelKey: NavLabelKey;
  to: NonNullable<LinkProps['to']>;
  icon: LucideIcon;
};

const PANEL_NAV_LINKS: readonly NavLink[] = [
  {
    labelKey: 'nav.panel.schedule',
    to: '/schedule',
    icon: CalendarDays,
  },
  {
    labelKey: 'nav.panel.employees',
    to: '/employees',
    icon: Users,
  },
  {
    labelKey: 'nav.panel.positions',
    to: '/positions',
    icon: Briefcase,
  },
  {
    labelKey: 'nav.panel.news',
    to: '/news',
    icon: Newspaper,
  },
];

const DISPOSITION_NAV_LINKS: readonly NavLink[] = [
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

const SETTINGS_LINK: NavLink = {
  labelKey: 'nav.settings',
  to: '/settings',
  icon: Settings,
};

export { PANEL_NAV_LINKS, DISPOSITION_NAV_LINKS, SETTINGS_LINK };
export type { NavLink };
