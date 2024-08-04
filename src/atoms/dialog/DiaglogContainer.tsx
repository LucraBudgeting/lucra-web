import { FC } from 'react';
import { EditIcon } from '@/assets/edit-icon';
import { CrossIcon } from '@/assets/cross-icon';
import { Button } from '../button/Button';
import { Styled } from './Dialog.styles';
import { DialogProps } from './Dialog.types';
import { MenuModal } from './MenuModal';

interface DiaglogContainerProps extends DialogProps {
  children?: React.ReactNode;
}

export const DialogContainer: FC<DiaglogContainerProps> = ({
  headerText,
  enableHeader = true,
  enableFooter = true,
  closeButton = true,
  successButton = true,
  disableSave = false,
  closeText = 'Close',
  nextText = 'Save',
  closeCb,
  successCb,
  editCb,
  menuButtons,
  children,
  closeOnOverlayClick = false,
  width = '540px',
  height = 'auto',
  forwardRef,
}) => {
  const closeDialog = () => {
    if (closeCb) {
      closeCb();
    }
  };

  const successDialog = () => {
    if (successCb) {
      successCb();
    }
  };

  const overLayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (closeOnOverlayClick) {
      closeDialog();
    }
  };

  const dialogClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <Styled.overlay onClick={overLayClick} id="dialog-overlay">
      <Styled.dialog ref={forwardRef} onClick={dialogClick} width={width} id="dialog-container">
        {enableHeader && (
          <Styled.header id="dialog-header">
            <Styled.headerText>
              <p>{headerText}</p>
            </Styled.headerText>
            <Styled.headerActions>
              {menuButtons && <MenuModal buttons={menuButtons} />}
              {editCb && (
                <p onClick={editCb} id="dialog_edit_icon">
                  <EditIcon />
                </p>
              )}
              <p onClick={closeDialog}>
                <CrossIcon />
              </p>
            </Styled.headerActions>
          </Styled.header>
        )}
        <Styled.content id="dialog-content" height={height}>
          {children}
        </Styled.content>
        {enableFooter && (
          <Styled.footer>
            {closeButton && (
              <Button
                onClick={closeDialog}
                label={closeText}
                primary={false}
                id="dialog_close_btn"
              />
            )}
            {successButton && (
              <Button
                onClick={successDialog}
                label={nextText}
                disabled={disableSave}
                id="dialog_success_btn"
              />
            )}
          </Styled.footer>
        )}
      </Styled.dialog>
    </Styled.overlay>
  );
};
