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
import { RulesDialog } from '@/components/dialog/Rules/RulesDialog';
import useClientDevice from '@/hooks/client/useClientDevice';
import { maxZIndex } from '@/utils/domConstants';
import { BillingIcon } from '@/assets/billing-icon';
import { ApiContext } from '@/stores/contexts/api.context';
import { DarkLogoAnimatedIcon } from '@/assets/logos/Dark_Logo.animated';
import { LightningIcon } from '@/assets/lightning-icon';
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
  const { billingApi } = useContext(ApiContext);
  const { windowSize, isMobile } = useClientDevice();
  const [modalStatus, setModalStatus] = useState(initialModalStatus);
  const [isFetchingBillingUrl, setIsFetchingBillingUrl] = useState(false);

  const [modalStyle, setModalStyle] = useState<React.CSSProperties>({
    display: 'none',
  });

  useEffect(() => {
    if (isMobile) {
      // Set style to be center of screen
      setModalStyle({
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      });

      return;
    }

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
  }, [parentRef, windowSize, isMobile]);

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

  function goToBilling() {
    setIsFetchingBillingUrl(true);
    billingApi
      .getBillingUrl()
      .then((billingUrl) => {
        location.href = billingUrl;
      })
      .finally(() => {
        setIsFetchingBillingUrl(false);
      });
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
            id="settings_accounts"
          />
          <SettingModalSection
            Icon={isFetchingBillingUrl ? DarkLogoAnimatedIcon : BillingIcon}
            title="Billing"
            onClick={goToBilling}
            id="settings_billing"
          />
          <SettingModalSection Icon={LightningIcon} title="Rules" onClick={onRulesClick} />
          {isSettingsModalAppearanceEnabled && (
            <SettingModalSection
              Icon={ApperanceOutline}
              title="Appearance"
              onClick={onAppearanceClick}
              id="settings_appearance"
            />
          )}
          {isSettingsModalNotificationsEnabled && (
            <SettingModalSection
              Icon={NotificationsOutline}
              title="Notifications"
              onClick={onNotificationsClick}
              id="settings_notifications"
            />
          )}
          <SettingModalSection
            Icon={PaperOutline}
            title="Privacy Policy"
            onClick={onPrivacyPolicyClick}
            id="settings_privacy"
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
    z-index: ${maxZIndex - 1}; // High z-index to be on top of other content
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
