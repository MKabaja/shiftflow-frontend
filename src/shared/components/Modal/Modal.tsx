import type { HTMLMotionProps } from 'motion/react';
import { AnimatePresence, motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useId } from 'react';
import { focusStyles } from '@/shared/lib/styles/focusStyles.ts';
import { useModal } from '@/shared/hooks/useModal.ts';
import { X } from 'lucide-react';
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

  const { panelRef } = useModal(isOpen, onClose);

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay onClose={closeOnBackdrop ? onClose : () => {}}>
          <motion.div
            role="dialog"
            aria-modal={true}
            ref={panelRef}
            tabIndex={-1}
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
                className={cn(buttonStyles, focusStyles)}
                type="button"
                onClick={onClose}
                aria-label="close" //TODO: tłumaczenia
              >
                <X size={16}></X>
              </button>
            </header>
            <div
              tabIndex={-1}
              className={cn(bodyStyles)}
            >
              {children}
            </div>
            {footer && <footer className={cn(footerStyles)}>{footer}</footer>}
          </motion.div>
        </Overlay>
      )}
    </AnimatePresence>
  );
}
