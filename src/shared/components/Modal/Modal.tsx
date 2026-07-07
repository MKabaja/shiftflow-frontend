import type { HTMLMotionProps } from 'motion/react';
import { AnimatePresence, motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useId } from 'react';
import { X } from 'lucide-react';
import { useFocusReturn } from '@/shared/hooks/useFocusReturn.ts';
import { Overlay } from './Overlay.tsx';
import { cn } from '@/shared/lib/helpers/cn.ts';
import {
  baseStyles,
  bodyStyles,
  buttonStyles,
  descriptionStyles,
  footerStyles,
  headerStyles,
  sizeStyles,
  titleStyles,
} from './Modal.styles.ts';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

type ModalProps = HTMLMotionProps<'div'> & {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: ModalSize;
  footer?: ReactNode;
  closeOnBackdrop?: boolean;
  children?: ReactNode;
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

  useFocusReturn(isOpen);

  // TODO focus/scroll: useLockBodyScroll(isOpen,'both') + useKeyClose(isOpen,onClose) + useFocusReturn(isOpen,triggerRef)
  //   + nowy useFocusTrap(panelRef) — panelRef jako ref na tym <motion.div>

  // TODO i18n: aria-label przycisku close (np. t('common.close')) zamiast "close"

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay onClose={closeOnBackdrop ? onClose : () => {}}>
          <motion.div
            role="dialog"
            aria-modal={true}
            aria-labelledby={titleId}
            aria-describedby={description ? descId : undefined}
            className={cn(sizeStyles[size], baseStyles, className)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            {...rest}
          >
            <header className={headerStyles}>
              <div>
                <h2
                  className={cn(titleStyles)}
                  id={titleId}
                >
                  {title}
                </h2>
                {description && (
                  <p
                    id={descId}
                    className={cn(descriptionStyles)}
                  >
                    {description}
                  </p>
                )}
              </div>
              <button
                className={cn(buttonStyles)}
                type="button"
                onClick={onClose}
                aria-label="close" //TODO: tłumaczenia
              >
                <X size={16}></X>
              </button>
            </header>
            <div className={cn(bodyStyles)}>{children}</div>
            {footer && <footer className={cn(footerStyles)}>{footer}</footer>}
          </motion.div>
        </Overlay>
      )}
    </AnimatePresence>
  );
}
