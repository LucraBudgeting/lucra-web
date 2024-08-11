import { FC, useState } from 'react';
import styled from 'styled-components';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FilterIcon } from '@/assets/filter-icon';
import { PlusIcon } from '@/assets/plus-icon';
import { SpyGlassOutline } from '@/assets/spyglass-outline';
import { SearchInput } from '@/atoms/input/SearchInput';
import colors from '@/assets/theme/colors';

interface TransactionHeaderProps {
  searchValue: string;
  onSearchChange: (search: string) => void;
}

const enableFeature = {
  add: false,
  search: true,
  settings: false,
};

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
              {enableFeature.add && (
                <span onClick={toggleAdd}>
                  <PlusIcon />
                </span>
              )}
              {enableFeature.search && (
                <span onClick={toggleSearch}>
                  <SpyGlassOutline type="bold" />
                </span>
              )}
              {enableFeature.settings && (
                <span onClick={toggleSettings}>
                  <FilterIcon />
                </span>
              )}
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
    margin-top: -0.75rem;
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
      padding: 5px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: ${colors.grey[300]};
        border-radius: 30%;
      }
    }
  `,
};
