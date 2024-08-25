import styled from 'styled-components';
import colors from '@/assets/theme/colors';

export default {
  chip: styled.div`
    user-select: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 6px 12px;
    cursor: pointer;
    transition:
      background-color,
      border,
      border-radius 0.25s ease-in-out;
    background-color: transparent;
    border-radius: 16px;

    &:hover {
      border-radius: 8px;
      background-color: ${colors.grey[200]};
    }
  `,
  emoji: styled.span`
    font-size: 20px;
    margin-right: 6px;
  `,
  label: styled.span`
    font-size: 14px;
    margin-right: 0.25rem;
  `,
  addLabel: styled.span`
    font-size: 14px;
    margin-right: 0.25rem;
    color: ${colors.grey[600]};
  `,
};
