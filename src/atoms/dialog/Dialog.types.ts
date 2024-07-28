import { menuButtonProps } from './MenuModal';

export interface DialogProps<T = any> {
  forwardRef?: React.RefObject<HTMLDivElement>;
  headerText?: string;
  enableHeader?: boolean;
  enableFooter?: boolean;
  closeButton?: boolean;
  successButton?: boolean;
  closeCb: () => void;
  successCb?: (param?: T) => void;
  editCb?: () => void;
  menuButtons?: menuButtonProps[];
  disableSave?: boolean;
  closeOnOverlayClick?: boolean;
  width?: string;
  height?: string;
  closeText?: string;
  nextText?: string;
}
