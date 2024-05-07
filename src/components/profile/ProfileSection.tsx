import { FC } from 'react';
import styled from 'styled-components';

interface ProfileSectionProps {
  Icon: React.ElementType;
  title: string;
}

export const ProfileSection: FC<ProfileSectionProps> = ({ Icon, title }) => {
  return (
    <Styled.container>
      <Icon />
      <Styled.title>{title}</Styled.title>
    </Styled.container>
  );
};

const Styled = {
  container: styled.div`
    display: flex;
    padding-bottom: 20px;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;
    gap: 10px;
    border-bottom: 1px solid var(--Grey-Stroke, #e2e2e2);

    :hover {
      cursor: pointer;
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
