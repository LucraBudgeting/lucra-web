import { FC } from 'react';
import styled from 'styled-components';
import { ProfileOutline } from '@/assets/profile-outline';
import { AccountsOutlineline } from '@/assets/accounts-outline';
import { ApperanceOutline } from '@/assets/apperance-outline';
import { NotificationsOutline } from '@/assets/notifications-outline';
import { PaperOutline } from '@/assets/paper-outline';
import { useOutsideClickRef } from '@/hooks/react/useOutsideClickRef';
import { useAuth } from '@/hooks/authentication/useAuth.hook';
import { ProfileSection } from './ProfileSection';
import { ProfileHeader } from './ProfileHeader';

interface ProfileModalProps {
  outsideClickCb?: () => void;
}

export const ProfileModal: FC<ProfileModalProps> = ({ outsideClickCb }) => {
  const modalRef = useOutsideClickRef(outsideClickCb);
  const { logout } = useAuth();

  return (
    <Styled.overlay>
      <Styled.container ref={modalRef}>
        <ProfileHeader />
        <ProfileSection Icon={ProfileOutline} title="Profile" />
        <ProfileSection Icon={AccountsOutlineline} title="Accounts" />
        <ProfileSection Icon={ApperanceOutline} title="Appearance" />
        <ProfileSection Icon={NotificationsOutline} title="Notifications" />
        <ProfileSection Icon={PaperOutline} title="Privacy Policy" />
        <Styled.logout onClick={logout}>Log Out</Styled.logout>
      </Styled.container>
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
  container: styled.div`
    display: flex;
    width: 15.625rem;
    padding: 1.25rem;
    flex-direction: column;
    align-items: center;

    border-radius: 1rem;
    border: 1px solid var(--Grey-Stroke, #e2e2e2);
    background: #fff;

    box-shadow: 0px 2px 8px -1px rgba(0, 0, 0, 0.1);
  `,
  logout: styled.button`
    display: flex;
    height: 20px;
    flex-direction: column;
    justify-content: flex-end;
    align-self: stretch;
    color: var(--Brand---Red, #e00052);

    margin-top: 20px;

    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    background-color: transparent;
    border: none;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  `,
};
