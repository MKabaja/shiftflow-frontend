import { Link } from '@tanstack/react-router';
import type { NavLink } from '@/app/layouts/navigation/navLinks.ts';
import { Logo } from '@/shared/components/Logo/Logo.tsx';
import { logoLinkStyles, logoStyles } from './Sidebar.styles.ts';

type SidebarHeaderProps = {
	landingPath: NavLink['to'];
};

export function SidebarHeader({ landingPath }: SidebarHeaderProps) {
	return (
		<div>
			<Link
				to={landingPath}
				className={logoLinkStyles}
			>
				<Logo
					variant="icon"
					size="md"
					className={logoStyles}
				/>
			</Link>
		</div>
	);
}
