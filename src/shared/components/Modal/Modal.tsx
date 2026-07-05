import { motion } from 'motion/react';
import type { ComponentProps, ReactNode } from 'react';
import { useId } from 'react';
import { X } from 'lucide-react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

type ModalProps = ComponentProps<'div'> & {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: ModalSize;
  footer?: ReactNode;
  closeOnBackdrop?: boolean;
};

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  size = 'md',
  footer,
  closeOnBackdrop = true,
  className,
  children,
  ...rest
}: ModalProps) {
  const titleId = useId();
  const descId = useId();

  // TODO (montaż — jutro): obudować return w <AnimatePresence> + <Overlay>, render warunkowy na isOpen:
  //   <AnimatePresence>
  //     {isOpen && (
  //       <Overlay onClose={closeOnBackdrop ? onClose : () => {}}>
  //         {/* ten <motion.div> = panel */}
  //       </Overlay>
  //     )}
  //   </AnimatePresence>
  // TODO focus/scroll: useLockBodyScroll(isOpen,'both') + useKeyClose(isOpen,onClose) + useFocusReturn(isOpen,triggerRef)
  //   + nowy useFocusTrap(panelRef) — panelRef jako ref na tym <motion.div>
  // TODO style: Modal.styles.ts → panelBase + sizeStyles[size], wpiąć przez cn(panelBase, sizeStyles[size], className)
  // TODO i18n: aria-label przycisku close (np. t('common.close')) zamiast "close"
  // TODO: spread {...rest} na panel, self-closing <X size={16} />
  return (
    <motion.div
      role="dialog"
      aria-modal={true}
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      className=""
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <header>
        <div>
          <h2 id={titleId}>{title}</h2>
          {description && <p id={descId}>{description}</p>}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="close" //TODO: tłumaczenia
        >
          <X size={16}></X>
        </button>
      </header>
      <div>{children}</div>
      {footer && <footer>{footer}</footer>}
    </motion.div>
  );
}
