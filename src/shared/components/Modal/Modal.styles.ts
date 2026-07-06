import type { ModalSize } from './Modal.tsx';

type SizeStyle = Record<ModalSize, string>;
const sizeStyles: SizeStyle = {
  sm: 'max-w-[25rem]',
  md: 'max-w-[35rem]',
  lg: 'max-w-[47.5rem]',
  xl: 'max-w-[60rem]',
};
const baseStyles: string =
  ' relative mx-4 flex w-full flex-col max-h-[85vh] overflow-hidden bg-bg-card rounded-lg shadow-nm-raised-lg';
const headerStyles: string =
  ' flex items-center  justify-between  gap-4 border-b border-border-subtle p-6';
const titleStyles: string = 'text-display-md text-text-primary';
const descriptionStyles: string = 'text-body-md text-text-muted mt-1';
const buttonStyles: string =
  'shrink-0 rounded-md p-1 text-text-muted transition-colors duration-200 hover:text-text-primary hover:bg-bg-offset';
const bodyStyles: string = 'flex-1 overflow-y-auto p-6';
const footerStyles: string =
  'flex justify-end gap-2 border-t border-border-subtle bg-bg-offset px-6 py-4';

export {
  titleStyles,
  sizeStyles,
  baseStyles,
  headerStyles,
  buttonStyles,
  bodyStyles,
  footerStyles,
  descriptionStyles,
};
