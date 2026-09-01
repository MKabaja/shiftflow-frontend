import { BOTTOM_NAV_LINKS } from './BottomNav.items.ts';
import { Link, useMatchRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/shared/lib/helpers/cn.ts';

function BottomNav() {
  const { t } = useTranslation();
  const matchRoute = useMatchRoute();
  const activeLink = BOTTOM_NAV_LINKS.find(({ to }) => matchRoute({ to }));

  const activeLinkRef = useRef<HTMLAnchorElement>(null);
  const navListRef = useRef<HTMLUListElement>(null);
  const ballRef = useRef<HTMLSpanElement>(null);

  const [indicatorX, setIndicatorX] = useState<number>(0);

  useLayoutEffect(() => {
    const link = activeLinkRef.current;
    const ball = ballRef.current;

    if (!link || !ball) return;

    setIndicatorX(link.offsetLeft + link.offsetWidth / 2 - ball.offsetWidth / 2);
  }, [activeLink?.to]);

  return (
    <nav
      aria-label={t('nav.label')}
      className="z-bottom-nav bg-bg-nav border-border shadow-nav-top sticky bottom-0 flex min-h-16 w-full items-center rounded-t-lg border-t"
    >
      <ul
        ref={navListRef}
        className="relative flex flex-1 items-center"
      >
        <motion.span
          ref={ballRef}
          animate={{ x: indicatorX, y: '-40%' }}
          className="text-accent shadow-nm-raised-sm border-border bg-bg-offset pointer-events-none absolute flex h-12 w-12 items-center justify-center rounded-full border"
        ></motion.span>
        {BOTTOM_NAV_LINKS.map(({ icon: Icon, labelKey, to }) => {
          const isActive = !!matchRoute({ to });

          return (
            <li
              className="text-text-muted text-body-sm flex-1"
              key={labelKey}
            >
              <Link
                to={to}
                className="flex w-full flex-col items-center gap-1"
                ref={isActive ? activeLinkRef : undefined}
              >
                <motion.span animate={{ y: isActive ? -8 : 0 }}>
                  <Icon
                    size={isActive ? 24 : 20}
                    aria-hidden={true}
                    className={cn(
                      'relative',
                      isActive && 'text-accent drop-shadow-[0_0_8px_rgba(201,163,71,0.8)]',
                    )}
                  />
                </motion.span>

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
