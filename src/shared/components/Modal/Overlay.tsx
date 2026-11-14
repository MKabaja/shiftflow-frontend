import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/shared/lib/helpers/cn.ts';
import { overlayPlacementStyles } from './Modal.styles.ts';
import type { ModalPlacement } from './Modal.tsx';

type OverlayProps = {
	onClose: () => void;
	placement: ModalPlacement;
	children: ReactNode;
};
export function Overlay({ onClose, placement, children }: OverlayProps) {
	return createPortal(
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.2 }}
			exit={{ opacity: 0 }}
			className={cn(
				'fixed inset-0 z-modal flex bg-black/70 backdrop-blur-sm',
				overlayPlacementStyles[placement],
			)}
			onClick={(e) => {
				if (e.target === e.currentTarget) onClose();
			}}
		>
			{children}
		</motion.div>,
		document.body,
	);
}
