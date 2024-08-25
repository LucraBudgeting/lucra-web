import { menuButtonProps } from './MenuModal';

export interface DialogProps<T = any> {
  forwardRef?: React.RefObject<HTMLDivElement>;
  headerText?: string;
  headerElement?: React.ReactNode;
  enableHeader?: boolean;
  enableFooter?: boolean;
  closeButton?: boolean;
  deleteButton?: boolean;
  successButton?: boolean;
  deleteCb?: () => void;
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
  showBackground?: boolean;
}
