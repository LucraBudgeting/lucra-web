import { FC, useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { PlusIcon } from '@/assets/plus-icon';
import { ProfileFilled } from '@/assets/profile-filled';
import {
  addNewCategory,
  dashboardSelector,
  goBack1Month,
  goForward1Month,
  resetDateRange,
} from '@/stores/slices/Dashboard.slice';
import { getShortMonth, yearFromIso } from '@/utils/time.helper';
import { SettingModal } from '@/components/setting/modal/SettingModal';
import { FeatureFlagContext } from '@/stores/contexts/featureFlag.context';
import { ICategory } from '@/types/basic/Category.type';
import { ApiContext } from '@/stores/contexts/api.context';
import colors from '@/assets/theme/colors';
import { Button } from '@/atoms/button/Button';
import { EditOrAddCategoryDialog } from '../dialog/EditOrAddCategoryDialog';
import { SideArrowFilledIcon } from '../../assets/side-arrow-filled-icon';
import { BudgetHeaderTimeRanges } from './BudgetHeaderTimeRanges';

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

  const { dateRange, currentRange } = dashboardSelector();

  const isNotInCurrentMonth = !isInCurrentMonth(new Date(dateRange.endDate));

  let startDateStr = `${getShortMonth(dateRange.endDate)} ${yearFromIso(dateRange.endDate)}`;

  if (currentRange !== '1mo') {
    startDateStr = `${getShortMonth(dateRange.startDate)} ${yearFromIso(dateRange.startDate)} - ${getShortMonth(dateRange.endDate)} ${yearFromIso(dateRange.endDate)}`;
  }

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

  function goToCurrentMonth() {
    dispatch(resetDateRange());
  }

  function toggleProfile() {
    setIsProfileOpen(!isProfileOpen);
  }

  function toggleSettings() {
    setIsSettingsOpen(!isSettingsOpen);
  }

  function toggleAdd() {
    setIsAddOpen(!isAddOpen);
  }

  function forward1Month() {
    dispatch(goForward1Month());
  }

  function backward1Month() {
    dispatch(goBack1Month());
  }

  return (
    <>
      <Styles.container>
        <Styles.dateContainer>
          <h2>{startDateStr}</h2>
          <span onClick={backward1Month}>
            <SideArrowFilledIcon />
          </span>
          <span onClick={forward1Month}>
            <SideArrowFilledIcon direction="right" />
          </span>
        </Styles.dateContainer>
        <Styles.iconContainer id="budget-header-icons-container">
          {isNotInCurrentMonth && (
            <Button type="empty" onClick={goToCurrentMonth}>
              Current month
            </Button>
          )}
          <span onClick={toggleAdd}>
            <PlusIcon id="add_new_budget_header_icon" />
          </span>
          {isBudgetHeaderProfileIconEnabled && (
            <span onClick={toggleProfile}>
              <ProfileFilled />
            </span>
          )}
          <span onClick={toggleSettings} ref={settingCogRef} id="settings_cog_budget_header_icon">
            <ProfileFilled />
          </span>
          <BudgetHeaderTimeRanges />
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
    display: flex;
    align-items: center;
    user-select: none;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: 24px;
      height: 22px;

      &:hover {
        background-color: ${colors.grey[300]};
        border-radius: 30%;
      }
    }

    h2 {
      font-size: 18px;
      font-weight: 700;
      line-height: 22px;
      text-align: left;
      min-width: 100px;
    }
  `,

  iconContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;

    span {
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: ${colors.grey[300]};
        border-radius: 30%;
      }
    }
  `,
  currentMonthButton: styled.div``,
};

function isInCurrentMonth(date: Date) {
  const now = new Date();
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
}
