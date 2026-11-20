import type { LinkProps } from '@tanstack/react-router';
import type { ParseKeys } from 'i18next';
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
	`nav.manager.${string}` | `nav.employee.${string}` | 'nav.settings'
>;

type NavLink = {
	labelKey: NavLabelKey;
	to: NonNullable<LinkProps['to']>;
	icon: LucideIcon;
};

const MANAGER_NAV_LINKS: readonly NavLink[] = [
	{
		labelKey: 'nav.manager.schedule',
		to: '/schedule',
		icon: CalendarDays,
	},
	{
		labelKey: 'nav.manager.employees',
		to: '/employees',
		icon: Users,
	},
	{
		labelKey: 'nav.manager.positions',
		to: '/positions',
		icon: Briefcase,
	},
	{
		labelKey: 'nav.manager.news',
		to: '/news',
		icon: Newspaper,
	},
];

const EMPLOYEE_NAV_LINKS: readonly NavLink[] = [
	{
		labelKey: 'nav.employee.availability',
		to: '/availability',
		icon: SquarePen,
	},
	{
		labelKey: 'nav.employee.home',
		to: '/home',
		icon: House,
	},
	{
		labelKey: 'nav.employee.mySchedule',
		to: '/my-schedule',
		icon: ClipboardList,
	},
];

const SETTINGS_LINK: NavLink = {
	labelKey: 'nav.settings',
	to: '/settings',
	icon: Settings,
};

export type { NavLink };
export { EMPLOYEE_NAV_LINKS, MANAGER_NAV_LINKS, SETTINGS_LINK };
