import { Link } from '@tanstack/react-router';
import { motion, useReducedMotion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import type { NavLink } from '@/app/layouts/navigation/navLinks.ts';
import { cn } from '@/shared/lib/helpers/cn.ts';
import {
	iconStyles,
	indicatorStyles,
	labelStyles,
	linkActiveStyles,
	linkStyles,
} from './Sidebar.styles.ts';

type SidebarNavLinkProps = {
	link: NavLink;
	isActive: boolean;
};

export function SidebarNavLink({
	link: { icon: Icon, labelKey, to },
	isActive,
}: SidebarNavLinkProps) {
	const { t } = useTranslation();
	const shouldReduceMotion = useReducedMotion();

	const label = t(labelKey);

	return (
		<>
			{isActive && (
				<motion.span
					layoutId="sidebar-indicator"
					transition={
						shouldReduceMotion
							? { duration: 0 }
							: { type: 'spring', stiffness: 400, damping: 32 }
					}
					className={indicatorStyles}
				/>
			)}

			<Link
				to={to}
				title={label}
				aria-current={isActive ? 'page' : undefined}
				className={cn(linkStyles, isActive && linkActiveStyles)}
			>
				<Icon
					size={20}
					aria-hidden={true}
					className={iconStyles}
				/>

				<span className={labelStyles}>{label}</span>
			</Link>
		</>
	);
}
