import { FC } from 'react';
import styled from 'styled-components';
import { Button } from '@/atoms/button/Button';
import { DialogContainer } from '@/atoms/dialog/DiaglogContainer';
import { DialogProps } from '@/atoms/dialog/Dialog.types';
import { TrashIcon } from '@/assets/trash-icon';

interface DestroyDialogProps extends DialogProps {
  topText: string;
  bottomText: string;
}

export const DestroyDialog: FC<DestroyDialogProps> = (props) => {
  const { topText, bottomText, successCb, closeCb } = props;

  function onDelete() {
    if (successCb) {
      successCb();
    }
  }

  function onCancel() {
    if (closeCb) {
      closeCb();
    }
  }

  return (
    <DialogContainer
      {...props}
      enableFooter={false}
      enableHeader={false}
      headerText=""
      width="340px"
    >
      <Styled.container>
        <Styled.trashContainer>
          <TrashIcon color="#D92D20" />
        </Styled.trashContainer>
        <Styled.topText>{topText}</Styled.topText>
        <Styled.bottomText>{bottomText}</Styled.bottomText>
        <Styled.buttonContainer>
          <Button type="error" onClick={onDelete}>
            Delete
          </Button>
          <Button type="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </Styled.buttonContainer>
      </Styled.container>
    </DialogContainer>
  );
};

const Styled = {
  trashContainer: styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #fee4e2;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  container: styled.div`
    margin-bottom: 2rem;
  `,
  topText: styled.h1`
    font-weight: 600;
    line-height: 28px;
    text-align: left;
  `,
  bottomText: styled.p`
    font-weight: 400;
    line-height: 20px;
    text-align: left;
    margin-bottom: 1rem;
    color: #525252;
    font-size: 14px;
  `,
  buttonContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
};
