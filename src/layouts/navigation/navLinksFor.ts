import type { User } from '@/shared/types/api.ts';
import type { NavLink } from './navLinks.ts';
import { DISPOSITION_NAV_LINKS, PANEL_NAV_LINKS } from './navLinks.ts';

/**
 * Resolves which set of navigation links a user gets in the app shell.
 *
 * The single owner of that decision, so the sidebar and the bottom bar can
 * never end up offering different destinations to the same person. Both
 * render whatever this returns.
 *
 * @param user The current {@link User}, or `null` when none is loaded.
 * @returns The disposition links for an employee, the panel links otherwise.
 */
function navLinksFor(user: User | null): readonly NavLink[] {
  return user?.role === 'employee' ? DISPOSITION_NAV_LINKS : PANEL_NAV_LINKS;
}

export { navLinksFor };
