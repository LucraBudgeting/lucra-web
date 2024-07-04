import { FC, useState } from 'react';
import styled from 'styled-components';
import { FilterIcon } from '@/assets/filter-icon';
import { PlusIcon } from '@/assets/plus-icon';
import { SpyGlassOutline } from '@/assets/spyglass-outline';

interface TransactionHeaderProps {}

export const TransactionHeader: FC<TransactionHeaderProps> = ({}) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
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
    <Styles.container>
      <Styles.title>Transactions</Styles.title>
      <Styles.optionsContainer>
        <Styles.iconContainer>
          <span onClick={toggleAdd}>
            <PlusIcon />
          </span>
          <span onClick={toggleProfile}>
            <SpyGlassOutline type="bold" />
          </span>
          <span onClick={toggleSettings}>
            <FilterIcon />
          </span>
        </Styles.iconContainer>
      </Styles.optionsContainer>
    </Styles.container>
  );
};

const Styles = {
  container: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  `,
  title: styled.h2`
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px; /* 122.222% */
  `,
  optionsContainer: styled.div``,
  iconContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    span {
      cursor: pointer;
    }
  `,
};
