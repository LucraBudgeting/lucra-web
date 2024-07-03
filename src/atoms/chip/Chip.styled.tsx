import styled from 'styled-components';
import { hexToRGBA } from '@/utils/hexToRGBA';

export default {
  chip: styled.div<{ backgroundcolor?: string }>`
    user-select: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    padding: 6px 12px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    transition: opacity 0.5s ease;

    &:hover {
      opacity: 0.5;
    }

    background-color: ${({ backgroundcolor }) => hexToRGBA(backgroundcolor || '#000', 0.8)};
  `,
  emoji: styled.span`
    font-size: 20px;
    margin-right: 6px;
  `,
  label: styled.span`
    font-size: 14px;
  `,
};
