import { Spinner } from '@/shared/components/Spinner/Spinner.tsx';
import { baseStyles } from './Splash.styles.ts';

export function Splash() {
	return (
		<div className={baseStyles}>
			<Spinner size="lg" />
		</div>
	);
}
