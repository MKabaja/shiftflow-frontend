import type { ModalPlacement, ModalSize } from './Modal.tsx';

type SizeStyle = Record<ModalSize, string>;
type PlacementStyle = Record<ModalPlacement, string>;

const sizeStyles: SizeStyle = {
  sm: 'max-w-[25rem]',
  md: 'max-w-[35rem]',
  lg: 'max-w-[47.5rem]',
  xl: 'max-w-[60rem]',
};
const placementStyles: PlacementStyle = {
  center: 'mx-4 rounded-lg',
  sheet:
    'max-w-none rounded-t-2xl [&>div:last-child]:pb-[calc(1.5rem+env(safe-area-inset-bottom))] [&>footer:last-child]:pb-[calc(1rem+env(safe-area-inset-bottom))]',
};
const overlayPlacementStyles: PlacementStyle = {
  center: 'items-center justify-center',
  sheet: 'items-end justify-center',
};
const baseStyles: string =
  ' relative flex w-full flex-col max-h-[85dvh] overflow-hidden bg-bg-card shadow-nm-raised-lg';
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
  placementStyles,
  overlayPlacementStyles,
  baseStyles,
  headerStyles,
  buttonStyles,
  bodyStyles,
  footerStyles,
  descriptionStyles,
};
