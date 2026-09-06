import type { NavLink } from '@/layouts/navigation';
import { Link, useMatchRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/shared/lib/helpers/cn.ts';
import { Avatar } from '@/shared/components/Avatar';
import { Logo } from '@/shared/components/Logo';
import { Separator } from '@/shared/components/Separator';
import {
  footerStyles,
  iconStyles,
  indicatorStyles,
  itemStyles,
  labelStyles,
  linkActiveStyles,
  linkStyles,
  listStyles,
  logoLinkStyles,
  panelStyles,
  spacerStyles,
  userNameStyles,
  userStyles,
} from './Sidebar.styles.ts';

type SidebarProps = {
  links: readonly NavLink[];
  settingsLink: NavLink;
  userName?: string;
};

type SidebarNavLinkProps = {
  link: NavLink;
  isActive: boolean;
};

function SidebarNavLink({ link: { icon: Icon, labelKey, to }, isActive }: SidebarNavLinkProps) {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const label = t(labelKey);

  return (
    <>
      {isActive && (
        <motion.span
          layoutId="sidebar-indicator"
          transition={
            shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 32 }
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

function Sidebar({ links, settingsLink, userName }: SidebarProps) {
  const { t } = useTranslation();
  const matchRoute = useMatchRoute();

  const activeLink = [...links, settingsLink].find(({ to }) => matchRoute({ to }));

  return (
    <div className={spacerStyles}>
      <div className={panelStyles}>
        <Link
          to="/schedule"
          className={logoLinkStyles}
        >
          <Logo size="sm" />
        </Link>

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
              size="sm"
            />

            {userName && <span className={userNameStyles}>{userName}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Sidebar };
export type { SidebarProps };
