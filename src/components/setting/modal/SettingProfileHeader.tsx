import { FC } from 'react';
import styled from 'styled-components';
import { authenticationSelector } from '@/stores/slices/Authentication.slice';

interface ProfileHeaderProps {}

export const SettingProfileHeader: FC<ProfileHeaderProps> = ({}) => {
  const { name, email } = authenticationSelector();

  return (
    <Styled.container>
      {/* <Styled.avatar srcSet={avatarImgUrl} /> */}
      <Styled.name>{name}</Styled.name>
      <Styled.email>{email}</Styled.email>
    </Styled.container>
  );
};

const Styled = {
  container: styled.div`
    display: flex;
    padding: 1rem;
    flex-direction: column;
    align-items: center;
    gap: 0.625rem;
    align-self: stretch;

    border-radius: 0.625rem;
    background: var(--Grey-Off-white, #f9f9f9);
  `,
  avatar: styled.img`
    max-width: 50px;
    max-height: 50px;
    border-radius: 50%;
  `,
  name: styled.h1`
    color: var(--Grey-Dark, #333);
    text-align: center;

    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
  `,
  email: styled.p`
    color: var(--Grey-Light, #9b9b9b);
    text-align: center;

    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
  `,
};
