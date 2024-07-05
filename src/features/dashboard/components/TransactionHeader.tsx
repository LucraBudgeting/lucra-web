import { FC, useState } from 'react';
import styled from 'styled-components';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FilterIcon } from '@/assets/filter-icon';
import { PlusIcon } from '@/assets/plus-icon';
import { SpyGlassOutline } from '@/assets/spyglass-outline';
import { SearchInput } from '@/atoms/input/SearchInput';

interface TransactionHeaderProps {
  searchValue: string;
  onSearchChange: (search: string) => void;
}

export const TransactionHeader: FC<TransactionHeaderProps> = ({ searchValue, onSearchChange }) => {
  const [secondarySpaceRef] = useAutoAnimate();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  function toggleSearch() {
    setIsSearchOpen(!isSearchOpen);
  }

  function toggleSettings() {
    setIsSettingsOpen(!isSettingsOpen);
  }

  function toggleAdd() {
    setIsAddOpen(!isAddOpen);
  }

  const isOptionsContainerOpen = !isSearchOpen;

  return (
    <Styles.container>
      <Styles.title>Transactions</Styles.title>
      <span ref={secondarySpaceRef}>
        {isOptionsContainerOpen && (
          <Styles.optionsContainer>
            <Styles.iconContainer>
              <span onClick={toggleAdd}>
                <PlusIcon />
              </span>
              <span onClick={toggleSearch}>
                <SpyGlassOutline type="bold" />
              </span>
              <span onClick={toggleSettings}>
                <FilterIcon />
              </span>
            </Styles.iconContainer>
          </Styles.optionsContainer>
        )}
        {isSearchOpen && (
          <SearchInput
            showX={true}
            onXClick={toggleSearch}
            onChange={onSearchChange}
            value={searchValue}
          />
        )}
      </span>
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
