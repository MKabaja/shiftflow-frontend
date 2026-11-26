import { useMatchRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import type { NavLink } from '@/app/layouts/navigation/navLinks.ts';
import { Avatar } from '@/shared/components/Avatar/Avatar.tsx';
import { Separator } from '@/shared/components/Separator/Separator.tsx';
import {
	footerStyles,
	itemStyles,
	listStyles,
	panelStyles,
	spacerStyles,
	userNameStyles,
	userStyles,
} from './Sidebar.styles.ts';
import { SidebarHeader } from './SidebarHeader.tsx';
import { SidebarNavLink } from './SidebarNavLink.tsx';

type SidebarProps = {
	links: readonly NavLink[];
	settingsLink: NavLink;
	landingPath: NavLink['to'];
	userName?: string;
	onProfileClick: () => void;
};

function Sidebar({
	links,
	settingsLink,
	landingPath,
	userName,
	onProfileClick,
}: SidebarProps) {
	const { t } = useTranslation();
	const matchRoute = useMatchRoute();

	const activeLink = [...links, settingsLink].find(({ to }) =>
		matchRoute({ to }),
	);

	return (
		<div className={spacerStyles}>
			<div className={panelStyles}>
				<SidebarHeader landingPath={landingPath} />

				<nav aria-label={t('nav.label')}>
					<ul className={listStyles}>
						{links.map((link) => (
							<li
								className={itemStyles}
								key={link.to}
							>
								<SidebarNavLink
									link={link}
									isActive={link.to === activeLink?.to}
								/>
							</li>
						))}
					</ul>
				</nav>

				<div className={footerStyles}>
					<Separator />

					<div className={itemStyles}>
						<SidebarNavLink
							link={settingsLink}
							isActive={settingsLink.to === activeLink?.to}
						/>
					</div>

					<div className={userStyles}>
						<Avatar
							name={userName}
							label={t('profile.openLabel', { ns: 'auth' })}
							size="sm"
							onClick={onProfileClick}
						/>

						{userName && <span className={userNameStyles}>{userName}</span>}
					</div>
				</div>
			</div>
		</div>
	);
}

export type { SidebarProps };
export { Sidebar };
