import { FC, useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { PlusIcon } from '@/assets/plus-icon';
import { ProfileFilled } from '@/assets/profile-filled';
import { SettingsCogFilled } from '@/assets/settings-cog-filled';
import { addNewCategory, dashboardSelector } from '@/stores/slices/Dashboard.slice';
import { getShortMonth, yearFromIso } from '@/utils/time.helper';
import { SettingModal } from '@/components/setting/modal/SettingModal';
import { FeatureFlagContext } from '@/stores/contexts/featureFlag.context';
import { EditOrAddCategory } from '@/components/dialog/EditOrAddCategory';
import { ICategory } from '@/types/basic/Category.type';
import { ApiContext } from '@/stores/contexts/api.context';

interface BudgetHeaderProps {}

export const BudgetHeader: FC<BudgetHeaderProps> = ({}) => {
  const { isBudgetHeaderProfileIconEnabled } = useContext(FeatureFlagContext);
  const dispatch = useDispatch();

  const { categoryApi } = useContext(ApiContext);

  const settingCogRef = useRef<HTMLDivElement>(null);

  const [_isCategoryAdding, setIsCategoryAdding] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { dateRange } = dashboardSelector();

  const startDateStr = `${getShortMonth(dateRange.startDate)} ${yearFromIso(dateRange.startDate)}`;

  const addBudgetCb = (newCategory: ICategory) => {
    setIsCategoryAdding(true);
    categoryApi
      .AddCategory(newCategory)
      .then((res) => {
        dispatch(addNewCategory(res.category));
      })
      .finally(() => {
        setIsCategoryAdding(false);
      });
    toggleAdd();
  };

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
            {isBudgetHeaderProfileIconEnabled && (
              <span onClick={toggleProfile}>
                <ProfileFilled />
              </span>
            )}
            <span onClick={toggleSettings} ref={settingCogRef}>
              <SettingsCogFilled />
            </span>
          </Styles.iconContainer>
        </Styles.optionsContainer>
      </Styles.container>
      <>
        {isAddOpen && (
          <EditOrAddCategory
            budgeted={0}
            closeCb={toggleAdd}
            closeOnOverlayClick={true}
            successCb={addBudgetCb}
            nextText="Add Category"
          />
        )}
        {isProfileOpen && <div>PROFILE</div>}
        {isSettingsOpen && (
          <SettingModal outsideClickCb={toggleSettings} parentRef={settingCogRef} />
        )}
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
