import styled from 'styled-components';
import { maxZIndex } from '@/utils/domConstants';
import colors from '@/assets/theme/colors';

export const Styled = {
  overlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(139, 139, 139, 0.057); // Semi-transparent background
    z-index: ${maxZIndex}; // High z-index to be on top of other content
  `,
  dialog: styled.div<{ width: string }>`
    width: ${({ width }) => width};
    background: white;
    z-index: ${maxZIndex + 1}; // Ensures content is above the overlay
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 24px;
    box-shadow: 0px 8px 30px 0px rgba(0, 0, 0, 0.12);
    position: relative;
  `,
  header: styled.div`
    padding: 20px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    position: relative; // Needed for absolute positioning of the close button
    z-index: ${maxZIndex + 3};
    border-bottom: ${colors.grey[300]} solid 1px;
  `,
  headerText: styled.div`
    flex: 1; // Allows the header text to expand and helps in centering
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: center;

    p {
      font-family: Inter;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: 22px;
    }
  `,
  headerActions: styled.div`
    position: absolute;
    right: 1rem; // Positions the close button on the far right within the header
    top: 50%; // Vertically centers the button
    transform: translateY(-50%); // Ensures the button is perfectly centered vertically
    border: none;
    background: none;
    font-size: 16px;
    padding: 10px 20px; // Adequate padding for clickable area
    line-height: 1; // Normalizes line height to avoid unexpected sizing
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    p {
      cursor: pointer;
      width: 0.5rem;
    }
  `,
  footer: styled.div<{ right?: string }>`
    display: flex;
    padding: 24px;
    justify-content: ${({ right }) => (right === 'true' ? 'space-between' : 'flex-end')};
    align-items: center;
    align-self: stretch;
  `,
  footerButtonContainer: styled.div`
    display: flex;
    gap: 1rem;
  `,
  content: styled.div<{ height: string }>`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    padding: 30px 30px 0px 30px;
    width: calc(100% - 60px);
    height: ${({ height }) => height};
    /* z-index: -10; */
    /* max-height: 600px; */
  `,
};
