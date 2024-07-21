import { FC, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ProfileOutline } from '@/assets/profile-outline';
import { AccountsOutlineline } from '@/assets/accounts-outline';
import { ApperanceOutline } from '@/assets/apperance-outline';
import { NotificationsOutline } from '@/assets/notifications-outline';
import { PaperOutline } from '@/assets/paper-outline';
import { useOutsideClickRef } from '@/hooks/react/useOutsideClickRef';
import { useAuth } from '@/hooks/authentication/useAuth.hook';
import { FeatureFlagContext } from '@/stores/contexts/featureFlag.context';
import { CommitHash } from '@/utils/CommitHash';
import { AccountsDialog } from '@/components/dialog/Accounts/AccountsDialog';
import { AutomationIcon } from '@/assets/Automation-outline';
import { RulesDialog } from '@/components/dialog/Rules/RulesDialog';
import { SettingModalSection } from './SettingModalSection';
import { SettingProfileHeader } from './SettingProfileHeader';

interface ProfileModalProps {
  outsideClickCb?: () => void;
  parentRef: React.RefObject<HTMLDivElement>;
}

const initialModalStatus = {
  isProfileOpen: false,
  isAccountsOpen: false,
  isAppearanceOpen: false,
  isNotificationsOpen: false,
  isRulesOpen: false,
};

export const SettingModal: FC<ProfileModalProps> = ({ outsideClickCb, parentRef }) => {
  const {
    isSettingsModalAppearanceEnabled,
    isSettingsModalNotificationsEnabled,
    isSettingsModalProfileEnabled,
  } = useContext(FeatureFlagContext);
  const [modalStatus, setModalStatus] = useState(initialModalStatus);

  const [modalStyle, setModalStyle] = useState<React.CSSProperties>({
    display: 'none',
  });

  useEffect(() => {
    if (parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      const top = rect.bottom + window.scrollY + 10;
      const left = rect.left - 250 / 2;

      setModalStyle({
        position: 'absolute',
        top,
        left,
      });
    }
  }, [parentRef]);

  function handleOutsideClick() {
    if (modalStatus.isAccountsOpen || modalStatus.isRulesOpen) return;

    outsideClickCb && outsideClickCb();
  }

  const modalRef = useOutsideClickRef(handleOutsideClick);
  const { logout } = useAuth();

  function toggleProfile() {
    setModalStatus({ ...initialModalStatus, isProfileOpen: !modalStatus.isProfileOpen });
  }

  function toggleAccounts() {
    setModalStatus({ ...initialModalStatus, isAccountsOpen: !modalStatus.isAccountsOpen });
  }

  function toggleRules() {
    setModalStatus({ ...initialModalStatus, isRulesOpen: !modalStatus.isRulesOpen });
  }

  function toggleAppearance() {
    setModalStatus({ ...initialModalStatus, isAppearanceOpen: !modalStatus.isAppearanceOpen });
  }

  function toggleNotifications() {
    setModalStatus({
      ...initialModalStatus,
      isNotificationsOpen: !modalStatus.isNotificationsOpen,
    });
  }

  function closeAllModals() {
    setModalStatus(initialModalStatus);
  }

  function onProfileClick() {
    closeAllModals();
    toggleProfile();
  }

  function onAccountsClick() {
    closeAllModals();
    toggleAccounts();
  }

  function onRulesClick() {
    closeAllModals();
    toggleRules();
  }

  function onAppearanceClick() {
    closeAllModals();
    toggleAppearance();
  }

  function onNotificationsClick() {
    closeAllModals();
    toggleNotifications();
  }

  function onPrivacyPolicyClick() {
    closeAllModals();
    window.open('https://www.google.com/search?q=privacy+policy', '_blank');
  }

  return (
    <>
      <Styled.overlay>
        <Styled.container ref={modalRef} style={modalStyle}>
          <SettingProfileHeader />
          {isSettingsModalProfileEnabled && (
            <SettingModalSection Icon={ProfileOutline} title="Profile" onClick={onProfileClick} />
          )}
          <SettingModalSection
            Icon={AccountsOutlineline}
            title="Accounts"
            onClick={onAccountsClick}
          />
          <SettingModalSection Icon={AutomationIcon} title="Rules" onClick={onRulesClick} />
          {isSettingsModalAppearanceEnabled && (
            <SettingModalSection
              Icon={ApperanceOutline}
              title="Appearance"
              onClick={onAppearanceClick}
            />
          )}
          {isSettingsModalNotificationsEnabled && (
            <SettingModalSection
              Icon={NotificationsOutline}
              title="Notifications"
              onClick={onNotificationsClick}
            />
          )}
          <SettingModalSection
            Icon={PaperOutline}
            title="Privacy Policy"
            onClick={onPrivacyPolicyClick}
          />
          <Styled.logout onClick={logout}>Log Out</Styled.logout>
          <CommitHash />
        </Styled.container>
      </Styled.overlay>
      {modalStatus.isProfileOpen && <div>Profile</div>}
      {modalStatus.isAccountsOpen && (
        <AccountsDialog closeCb={toggleAccounts} closeOnOverlayClick={false} />
      )}
      {modalStatus.isRulesOpen && <RulesDialog closeCb={toggleRules} closeOnOverlayClick={false} />}
      {modalStatus.isAppearanceOpen && <div>Appearance</div>}
      {modalStatus.isNotificationsOpen && <div>Notifications</div>}
    </>
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
    width: 250px;
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
