import { FC } from 'react';
import styled from 'styled-components';
import { EditIcon } from '@/assets/edit-icon';
import { Button } from '../button/Button';
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
      <Styled.dialog onClick={dialogClick} width={width}>
        {enableHeader && (
          <Styled.header>
            <Styled.headerText>
              <p>{headerText}</p>
            </Styled.headerText>
            <Styled.headerActions>
              {editCb && (
                <div onClick={editCb}>
                  <EditIcon />
                </div>
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

const Styled = {
  overlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(139, 139, 139, 0.057); // Semi-transparent background
    z-index: 1000; // High z-index to be on top of other content
  `,
  dialog: styled.div<{ width: string }>`
    width: ${({ width }) => width};
    background: white;
    z-index: 1001; // Ensures content is above the overlay
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 24px;
    border: 1px solid var(--Grey-Stroke, #e2e2e2);
    box-shadow: 0px 8px 30px 0px rgba(0, 0, 0, 0.12);
  `,
  content: styled.div<{ height: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    border: 1px solid var(--Grey-Stroke, #e2e2e2);
    padding: 30px 30px 0px 30px;
    width: calc(100% - 60px);
    height: ${({ height }) => height};
    max-height: 600px;
  `,
  header: styled.div`
    padding: 20px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    position: relative; // Needed for absolute positioning of the close button
  `,
  headerText: styled.div`
    flex: 1; // Allows the header text to expand and helps in centering
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    p {
      font-family: Inter;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: 22px;
    }
  `,
  headerActions: styled.div`
    position: absolute;
    right: 0; // Positions the close button on the far right within the header
    top: 50%; // Vertically centers the button
    transform: translateY(-50%); // Ensures the button is perfectly centered vertically
    border: none;
    background: none;
    font-size: 16px;
    padding: 10px 20px; // Adequate padding for clickable area
    line-height: 1; // Normalizes line height to avoid unexpected sizing
    display: flex;
    gap: 20px;
    cursor: pointer;
  `,
  footer: styled.div`
    display: flex;
    padding: 24px;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
  `,
};
