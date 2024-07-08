import { FC } from 'react';
import styled from 'styled-components';

interface ProfileSectionProps {
  Icon: React.ElementType;
  title: string;
  onClick: () => void;
}

export const SettingModalSection: FC<ProfileSectionProps> = ({ Icon, title, onClick }) => {
  return (
    <Styled.container onClick={onClick}>
      <Icon />
      <Styled.title>{title}</Styled.title>
    </Styled.container>
  );
};

const Styled = {
  container: styled.div`
    display: flex;
    padding: 20px 0;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;
    gap: 10px;
    border-bottom: 1px solid var(--Grey-Stroke, #e2e2e2);
    cursor: pointer;
    transition: background-color 0.5s ease;
    user-select: none;

    &:hover {
      border-radius: 0.5rem;
      background-color: #80808017; /* Background color on hover */
    }
  `,
  title: styled.h1`
    color: var(--Grey-Dark, #333);

    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  `,
};
