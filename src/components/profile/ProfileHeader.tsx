import { FC } from 'react';
import styled from 'styled-components';

interface ProfileHeaderProps {}

const avatarImgUrl =
  'https://images.squarespace-cdn.com/content/v1/6204821bfe06b76898b431c5/1660858625934-ZVWEMZYZHLWTVCXC19E3/Brandon+Andre+-+Headshot+Los+Angeles+na4-3.jpg';
const name = 'Chandler Wescott';
const email = 'chanwes@gmail.com';

export const ProfileHeader: FC<ProfileHeaderProps> = ({}) => {
  return (
    <Styled.container>
      <Styled.avatar srcSet={avatarImgUrl} />
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
