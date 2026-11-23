import { User } from 'lucide-react';
import {
	baseStyles,
	sizeStyles,
} from '@/shared/components/Avatar/Avatar.styles.ts';
import { cn } from '@/shared/lib/helpers/cn.ts';
import { getInitials } from '@/shared/lib/helpers/getInitials.ts';
import { hashColor } from '@/shared/lib/helpers/hashColor.ts';
import { focusStyles } from '@/shared/lib/styles/focusStyles.ts';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type FallbackSize = Record<AvatarSize, number>;
type AvatarProps = {
	size?: AvatarSize;
	name?: string;
	label?: string;
	onClick?: () => void;
};
const iconSizes: FallbackSize = {
	xs: 12,
	sm: 16,
	md: 20,
	lg: 28,
	xl: 40,
};

function Avatar({ size = 'md', name, label, onClick }: AvatarProps) {
	const Tag = onClick ? 'button' : 'div';
	const accessibleName = label || name || undefined;
	const content = name ? (
		<span aria-hidden="true">{getInitials(name)}</span>
	) : (
		<User
			aria-hidden="true"
			className="text-border"
			size={iconSizes[size]}
		/>
	);

	return (
		<Tag
			style={{ backgroundColor: name ? hashColor(name) : undefined }}
			role={!onClick && accessibleName ? 'img' : undefined}
			aria-label={accessibleName}
			aria-hidden={!onClick && !accessibleName ? true : undefined}
			className={cn(
				baseStyles,
				sizeStyles[size],
				onClick && ['cursor-pointer hover:brightness-110', focusStyles],
			)}
			onClick={onClick}
			{...(onClick && { type: 'button' as const })}
		>
			{content}
		</Tag>
	);
}

export type { AvatarSize };
export { Avatar };
