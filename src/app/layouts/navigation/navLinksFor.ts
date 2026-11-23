import type { User } from '@/features/auth/model/user.schemas.ts';
import type { NavLink } from './navLinks.ts';
import { EMPLOYEE_NAV_LINKS, MANAGER_NAV_LINKS } from './navLinks.ts';

/**
 * Returns the navigation links for a user: employee links for an employee, manager links otherwise.
 */
export function navLinksFor(user: User | null): readonly NavLink[] {
	return user?.role === 'employee' ? EMPLOYEE_NAV_LINKS : MANAGER_NAV_LINKS;
}
