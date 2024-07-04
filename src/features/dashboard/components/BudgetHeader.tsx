import { FC, useState } from 'react';
import styled from 'styled-components';
import { PlusIcon } from '@/assets/plus-icon';
import { ProfileFilled } from '@/assets/profile-filled';
import { SettingsCogFilled } from '@/assets/settings-cog-filled';
import { ProfileModal } from '@/components/profile/ProfileModal';
import { dashboardSelector } from '@/stores/slices/Dashboard.slice';
import { getShortMonth, yearFromIso } from '@/utils/time.helper';

interface BudgetHeaderProps {}

export const BudgetHeader: FC<BudgetHeaderProps> = ({}) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { dateRange } = dashboardSelector();

  const startDateStr = `${getShortMonth(dateRange.startDate)} ${yearFromIso(dateRange.startDate)}`;

  function toggleProfile() {
    setIsProfileOpen(!isProfileOpen);
  }

  function toggleSettings() {
    setIsSettingsOpen(!isSettingsOpen);
  }

  function toggleAdd() {
    setIsAddOpen(!isAddOpen);
  }

  return (
    <>
      <Styles.container>
        <Styles.dateContainer>
          <h2>{startDateStr}</h2>
        </Styles.dateContainer>
        <Styles.optionsContainer>
          <Styles.iconContainer>
            <span onClick={toggleAdd}>
              <PlusIcon />
            </span>
            <span onClick={toggleProfile}>
              <ProfileFilled />
            </span>
            <span onClick={toggleSettings}>
              <SettingsCogFilled />
            </span>
          </Styles.iconContainer>
        </Styles.optionsContainer>
      </Styles.container>
      <>
        {isAddOpen && <div>add</div>}
        {isProfileOpen && <ProfileModal outsideClickCb={toggleProfile} />}
        {isSettingsOpen && <div>settings</div>}
      </>
    </>
  );
};

const Styles = {
  container: styled.div`
    margin-bottom: 2rem;
    width: 100%;
    height: 3vh;
    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
      cursor: pointer;
    }
  `,
  dateContainer: styled.div`
    h2 {
      font-size: 18px;
      font-weight: 700;
      line-height: 22px;
      text-align: left;
    }
  `,
  optionsContainer: styled.div``,
  iconContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
  `,
};
