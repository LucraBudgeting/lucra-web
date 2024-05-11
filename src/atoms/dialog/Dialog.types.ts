export interface DiaglogProps {
  headerText?: string;
  enableHeader?: boolean;
  enableFooter?: boolean;
  closeButton?: boolean;
  successButton?: boolean;
  closeCb: () => void;
  successCb?: () => void;
  editCb?: () => void;
  closeOnOverlayClick?: boolean;
  width?: string;
  height?: string;
}
