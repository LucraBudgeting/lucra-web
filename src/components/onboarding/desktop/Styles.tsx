import styled from 'styled-components';
import { BaseInput } from '@/atoms/input/BaseInput';

export const styles = {
  right: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - 75px);
    height: calc(100% - 75px);
    padding: 40px;
    box-sizing: border-box;
  `,
  rightImage: styled.img`
    max-height: 100%;
    max-width: 100%;
  `,
  left: styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
  `,
  leftTextContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    h1 {
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: 28px;
    }

    h3 {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
    }
  `,
  leftInputContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
  `,
  input: styled(BaseInput)``,
};
