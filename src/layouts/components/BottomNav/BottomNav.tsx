import type { BottomNavLink } from './BottomNav.items.ts';
import { Link, useMatchRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/shared/lib/helpers/cn.ts';

import {
  iconActiveStyles,
  iconBoxActiveStyles,
  iconBoxStyles,
  indicatorStyles,
  itemStyles,
  linkActiveStyles,
  linkStyles,
  listStyles,
  navStyles,
} from './BottomNav.styles.ts';

type BottomNavProps = {
  links: readonly BottomNavLink[];
};

function BottomNav({ links }: BottomNavProps) {
  const { t } = useTranslation();
  const matchRoute = useMatchRoute();
  const shouldReduceMotion = useReducedMotion();

  const activeLink = links.find(({ to }) => matchRoute({ to }));

  return (
    <nav
      aria-label={t('nav.label')}
      className={navStyles}
    >
      <ul className={listStyles}>
        {links.map(({ icon: Icon, labelKey, to }) => {
          const isActive = to === activeLink?.to;

          return (
            <li
              className={itemStyles}
              key={to}
            >
              {isActive && (
                <motion.span
                  layoutId="bottom-nav-indicator"
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
                aria-current={isActive ? 'page' : undefined}
                className={cn(linkStyles, isActive && linkActiveStyles)}
              >
                <span className={cn(iconBoxStyles, isActive && iconBoxActiveStyles)}>
                  <Icon
                    size={isActive ? 24 : 20}
                    aria-hidden={true}
                    className={cn(isActive && iconActiveStyles)}
                  />
                </span>

                <span>{t(labelKey)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export { BottomNav };
export type { BottomNavProps };
