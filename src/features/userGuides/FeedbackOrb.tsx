import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import colors from '@/assets/theme/colors';
import { Button } from '@/atoms/button/Button';
import { useOutsideClickRef } from '@/hooks/react/useOutsideClickRef';
import { ApiContext } from '@/stores/contexts/api.context';

// Styled components
const Orb = styled.div<{ isOpen: boolean }>`
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => (props.isOpen ? colors.brand.light : colors.brand.main)};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-size: 1.5rem;
  transition: background-color 0.75s ease;

  &:hover {
    background-color: ${colors.brand.light};
  }
`;

const Dialog = styled.div`
  position: fixed;
  bottom: 80px;
  left: 20px;
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
  const { userFeedbackApi } = useContext(ApiContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [hasFeedbackBeenSubmitted, setHasFeedbackBeenSubmitted] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setHasFeedbackBeenSubmitted(false);
  };

  const dialogRef = useOutsideClickRef(handleToggle);

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
      <Orb isOpen={isOpen} onClick={handleToggle}>
        💬
      </Orb>
      {isOpen && (
        <Dialog ref={dialogRef}>
          <h1>Leave Feedback</h1>
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
