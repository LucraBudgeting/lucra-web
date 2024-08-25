import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import colors from '@/assets/theme/colors';
import { Button } from '@/atoms/button/Button';
import { useOutsideClickRef } from '@/hooks/react/useOutsideClickRef';
import { ApiContext } from '@/stores/contexts/api.context';
import { maxZIndex } from '@/utils/domConstants';

// Styled components
const Orb = styled.div<{ $isOpen: boolean }>`
  user-select: none;
  position: fixed;
  bottom: 30px;
  right: 30px;
  border-radius: 100px;
  background-color: ${(props) => (props.$isOpen ? colors.brand.light : colors.grey[100])};
  padding: 10px 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  font-size: 12px;
  font-weight: 400;

  transition:
    background-color,
    box-shadow 0.75s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
    background-color: ${colors.brand.light};
  }
`;

const Dialog = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  bottom: 100px;
  right: 30px;
  min-width: 300px;
  max-width: 500px;
  padding: 20px;
  background-color: ${colors.grey[100]};
  border: 1px solid ${colors.grey[400]};
  border-radius: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  z-index: ${maxZIndex};

  transform: ${(props) => (props.$isOpen ? 'scale(1)' : 'scale(0.5)')};
  opacity: ${(props) => (props.$isOpen ? '1' : '0')};
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
`;

const FeedbackTextArea = styled.textarea`
  width: calc(100% - 20px);
  height: 100px;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid ${colors.grey[400]};
  background-color: ${colors.grey[100]};
  color: ${colors.grey[700]};
  font-family: 'Inter', sans-serif;

  transition: outline 0.75s ease;

  &:focus {
    outline: 1px solid ${colors.brand.main};
  }
`;

const Content = styled.p`
  color: ${colors.black.main};
  font-size: 16px;
  font-weight: 400;
`;

export const OrbWithFeedback: React.FC = () => {
  const orbRef = useRef<HTMLDivElement>(null);
  const { userFeedbackApi } = useContext(ApiContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [hasFeedbackBeenSubmitted, setHasFeedbackBeenSubmitted] = useState(false);

  const handleToggle = (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e) {
      e.stopPropagation();
    }
    if (isOpen) {
      // Closing: Start transition, then set isRendered to false after the transition duration
      setIsOpen(false);
      setTimeout(() => setIsRendered(false), 300); // Match this duration to your transition duration
    } else {
      // Opening: Set isRendered to true, then start transition
      setIsRendered(true);
      setTimeout(() => setIsOpen(true), 10); // Slight delay to ensure render before transition
    }
  };

  function handleOutsideClick() {
    if (!isOpen) return;
    handleToggle();
  }

  const dialogRef = useOutsideClickRef(handleOutsideClick, [orbRef]);

  function submitFeedback() {
    setIsSubmittingFeedback(true);
    userFeedbackApi.sendFeedback(feedback).finally(() => {
      setIsSubmittingFeedback(false);
      setFeedback('');
      setHasFeedbackBeenSubmitted(true);
    });
  }

  return (
    <>
      <Orb ref={orbRef} $isOpen={isOpen} onClick={handleToggle}>
        Leave feedback
      </Orb>
      {isRendered && (
        <Dialog ref={dialogRef} $isOpen={isOpen}>
          <h1 style={{ userSelect: 'none' }}>Leave Feedback</h1>
          <Content>
            Tell us about your experience with Lucra!
            <br />
            Let us know what you like, don’t like, or what features you would like to see in the
            future.
          </Content>
          <FeedbackTextArea
            placeholder="Enter feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <Button onClick={submitFeedback} disabled={isSubmittingFeedback || !feedback}>
            {isSubmittingFeedback ? 'Submitting' : 'Submit'}
          </Button>
          {hasFeedbackBeenSubmitted && <p>Thank you for your feedback!</p>}
        </Dialog>
      )}
    </>
  );
};
