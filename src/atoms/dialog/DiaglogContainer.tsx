import { FC } from 'react';
import { EditIcon } from '@/assets/edit-icon';
import { Button } from '../button/Button';
import { Styled } from './Dialog.styles';
import { DialogProps } from './Dialog.types';

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
    <Styled.overlay onClick={overLayClick}>
      <Styled.dialog ref={forwardRef} onClick={dialogClick} width={width}>
        {enableHeader && (
          <Styled.header>
            <Styled.headerText>
              <p>{headerText}</p>
            </Styled.headerText>
            <Styled.headerActions>
              {editCb && (
                <p onClick={editCb}>
                  <EditIcon />
                </p>
              )}
              <p onClick={closeDialog}>X</p>
            </Styled.headerActions>
          </Styled.header>
        )}
        <Styled.content height={height}>{children}</Styled.content>
        {enableFooter && (
          <Styled.footer>
            {closeButton && <Button onClick={closeDialog} label={closeText} primary={false} />}
            {successButton && (
              <Button onClick={successDialog} label={nextText} disabled={disableSave} />
            )}
          </Styled.footer>
        )}
      </Styled.dialog>
    </Styled.overlay>
  );
};
