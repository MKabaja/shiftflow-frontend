import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import type { ReactNode } from 'react';

type OverlayProps = {
  onClose: () => void;
  children: ReactNode;
};
export function Overlay({ onClose, children }: OverlayProps) {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {children}
    </motion.div>,
    document.body,
  );
}
