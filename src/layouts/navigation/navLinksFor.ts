import type { User } from '@/features/auth/model/user.schemas.ts';
import type { NavLink } from './navLinks.ts';
import { DISPOSITION_NAV_LINKS, PANEL_NAV_LINKS } from './navLinks.ts';

/**
 * Returns the navigation links for a user: disposition links for an employee, panel links otherwise.
 */
function navLinksFor(user: User | null): readonly NavLink[] {
  return user?.role === 'employee' ? DISPOSITION_NAV_LINKS : PANEL_NAV_LINKS;
}

export { navLinksFor };
