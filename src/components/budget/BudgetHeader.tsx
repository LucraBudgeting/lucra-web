import { FC, useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { PlusIcon } from '@/assets/plus-icon';
import { ProfileFilled } from '@/assets/profile-filled';
import { SettingsCogFilledIcon } from '@/assets/settings-cog-filled';
import { addNewCategory, dashboardSelector } from '@/stores/slices/Dashboard.slice';
import { getShortMonth, yearFromIso } from '@/utils/time.helper';
import { SettingModal } from '@/components/setting/modal/SettingModal';
import { FeatureFlagContext } from '@/stores/contexts/featureFlag.context';
import { ICategory } from '@/types/basic/Category.type';
import { ApiContext } from '@/stores/contexts/api.context';
import { EditOrAddCategoryDialog } from '../dialog/EditOrAddCategoryDialog';

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
        <Styles.iconContainer id="budget-header-icons-container">
          <span onClick={toggleAdd}>
            <PlusIcon id="add_new_budget_header_icon" />
          </span>
          {isBudgetHeaderProfileIconEnabled && (
            <span onClick={toggleProfile}>
              <ProfileFilled />
            </span>
          )}
          <span onClick={toggleSettings} ref={settingCogRef} id="settings_cog_budget_header_icon">
            <SettingsCogFilledIcon />
          </span>
        </Styles.iconContainer>
      </Styles.container>
      <>
        {isAddOpen && (
          <EditOrAddCategoryDialog
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

  iconContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
  `,
};
