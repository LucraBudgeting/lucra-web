export interface DialogProps<T = any> {
  headerText?: string;
  enableHeader?: boolean;
  enableFooter?: boolean;
  closeButton?: boolean;
  successButton?: boolean;
  closeCb: () => void;
  successCb?: (param?: T) => void;
  editCb?: () => void;
  disableSave?: boolean;
  closeOnOverlayClick?: boolean;
  width?: string;
  height?: string;
  closeText?: string;
  nextText?: string;
}
