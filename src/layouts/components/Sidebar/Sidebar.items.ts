import type { ParseKeys } from 'i18next';
import type { LinkProps } from '@tanstack/react-router';
import type { LucideIcon } from 'lucide-react';
import { Briefcase, CalendarDays, Newspaper, Settings, Users } from 'lucide-react';

type SidebarLabelKey = Extract<ParseKeys<'common'>, `nav.panel.${string}`>;

type SidebarLink = {
  labelKey: SidebarLabelKey;
  to: NonNullable<LinkProps['to']>;
  icon: LucideIcon;
};

const SIDEBAR_LINKS: readonly SidebarLink[] = [
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

const SIDEBAR_SETTINGS_LINK: SidebarLink = {
  labelKey: 'nav.panel.settings',
  to: '/settings',
  icon: Settings,
};

export { SIDEBAR_LINKS, SIDEBAR_SETTINGS_LINK };
export type { SidebarLink };
