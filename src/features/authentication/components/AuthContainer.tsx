import { FC } from 'react';
import styled from 'styled-components';
import { BackArrow } from '@/assets/back-arrow';
import { DarkLogo } from '@/assets/logos/Dark_Logo';
import { Button } from '@/atoms/button/Button';
import { DialogContainer } from '@/atoms/dialog/DiaglogContainer';
import { authRoutes } from '@/routes/RouteConstants';
import { maxZIndex } from '@/utils/domConstants';
import useClientDevice from '@/hooks/client/useClientDevice';

interface AuthContainerProps {
  forwardRef?: React.ForwardedRef<HTMLDivElement>;
  title: string;
  subText: string;
  cbText: string;
  cb: () => void;
  cbTabIndex: number;
  isCbDisabled: boolean;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

const showBackPaths = [authRoutes.login, authRoutes.register];

export const AuthContainer: FC<AuthContainerProps> = ({
  forwardRef: ref,
  title,
  subText,
  cbText,
  cb,
  cbTabIndex,
  footer,
  children,
  isCbDisabled,
}) => {
  const { isMobile } = useClientDevice();
  const showBackBtn = showBackPaths.includes(location.pathname);

  function onBackClick() {
    location.href = 'https://lucrabudgeting.com';
  }

  return (
    <>
      {showBackBtn && (
        <Styles.backBtn type="secondary" onClick={onBackClick}>
          <BackArrow /> Back
        </Styles.backBtn>
      )}
      <DialogContainer
        width={isMobile ? '100%' : '35vw'}
        closeCb={() => {}}
        enableFooter={false}
        enableHeader={false}
        showBackground={true}
      >
        <Styles.container ref={ref} id="auth-dialog-container">
          <DarkLogo />
          <Styles.group>
            <Styles.title>{title}</Styles.title>
            <Styles.subText>{subText}</Styles.subText>
          </Styles.group>
          {children}
          <Styles.group>
            <Styles.cbButton
              disabled={isCbDisabled}
              type="primary"
              onClick={cb}
              tabIndex={cbTabIndex}
              id="auth-dialog-cb-btn"
            >
              {cbText}
            </Styles.cbButton>
            {footer && footer}
          </Styles.group>
        </Styles.container>
      </DialogContainer>
    </>
  );
};

const Styles = {
  group: styled.div`
    width: 100%;
  `,
  title: styled.h1`
    font-size: 18px;
    font-weight: 600;
    line-height: 22px;
    color: #333333;
  `,
  subText: styled.p`
    margin-top: 0.5rem;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    color: #707070;
  `,
  container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 2rem;
    gap: 1rem;
    width: 30vw;

    @media (max-width: 1000px) {
      width: 50vw;
    }

    @media (max-width: 600px) {
      width: 90vw;
    }
  `,
  backBtn: styled(Button)`
    position: fixed;
    top: 10px;
    left: 10px;
    color: #000000;
    font-weight: 500;
    z-index: ${maxZIndex + 1};
    border: none;
    box-shadow: none;
  `,
  cbButton: styled(Button)`
    width: 100%;
  `,
};
