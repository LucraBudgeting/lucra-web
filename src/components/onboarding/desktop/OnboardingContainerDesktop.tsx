import { FC, useState } from 'react';
import styled from 'styled-components';
import { LoadingComponent } from '@/atoms/loading/Loading.Component';
import { ProgressBar } from '@/atoms/progress/ProgressBar';
import { OnboardingStep1Left, OnboardingStep1Right } from './OnboardingStep1';
import { StepperFooter } from './StepperFooter';
import { OnboardingStep2Left, OnboardingStep2Right } from './OnboardingStep2';
import { OnboardingStep3Left, OnboardingStep3Right } from './OnboardingStep3';
import { OnboardingStep4Left, OnboardingStep4Right } from './OnboardingStep4';
import { OnboardingStep5Left, OnboardingStep5Right } from './OnboardingStep5';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authRoutes } from '@/routes/RouteConstants';
import useClientDevice from '@/hooks/client/useClientDevice';

interface OnboardingDualCardContainerProps {}

export const OnboardingContainerDesktop: FC<OnboardingDualCardContainerProps> = ({}) => {
  const { isDesktop } = useClientDevice();

  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userid');
  const currentStep = searchParams.get('step');

  const [currentPage, setCurrentPage] = useState<number>(currentStep ? parseInt(currentStep) : 1);

  const navigate = useNavigate();
  const totalPages = 5;

  const nextPage = () => {
    if (currentPage === totalPages) return; // TODO - REPLACE WITH SUBMIT
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage === 1) {
      navigate(authRoutes.login);
      return;
    }
    setCurrentPage((prev) => prev - 1);
  };

  const { leftCard, rightCard } = getStepElement(currentPage);

  return (
    <Styled.container id="container">
      <Styled.cardContainer id="left">
        <Styled.leftCardContent id="left-content">
          <ProgressBar currentPage={currentPage} totalPages={totalPages} />
          {leftCard}
        </Styled.leftCardContent>
        <StepperFooter
          prevPage={prevPage}
          nextPage={nextPage}
          isLastPage={currentPage == totalPages}
        />
      </Styled.cardContainer>
      {isDesktop && (
        <Styled.cardContainer id="right">
          <Styled.rightCardContent id="right-content">{rightCard}</Styled.rightCardContent>
        </Styled.cardContainer>
      )}
    </Styled.container>
  );
};

function getStepElement(currentPage: number): {
  leftCard: React.ReactNode;
  rightCard: React.ReactNode;
} {
  switch (currentPage) {
    case 1:
      return {
        leftCard: <OnboardingStep1Left />,
        rightCard: <OnboardingStep1Right />,
      };
    case 2:
      return {
        leftCard: <OnboardingStep2Left />,
        rightCard: <OnboardingStep2Right />,
      };
    case 3:
      return {
        leftCard: <OnboardingStep3Left />,
        rightCard: <OnboardingStep3Right />,
      };
    case 4:
      return {
        leftCard: <OnboardingStep4Left />,
        rightCard: <OnboardingStep4Right />,
      };
    case 5:
      return {
        leftCard: <OnboardingStep5Left />,
        rightCard: <OnboardingStep5Right />,
      };
    default:
      return {
        leftCard: <LoadingComponent />,
        rightCard: <LoadingComponent />,
      };
  }
}

const Styled = {
  container: styled.div`
    width: 95%;
    height: 90%;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    background: #f9f9f9;
    padding: 20px;
  `,
  leftCardContent: styled.div`
    padding: 40px;
    border-radius: 20px 20px 0 0;
    background: #fff;
    height: calc(100% - 58px);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 40px;
  `,
  rightCardContent: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  `,
  cardContainer: styled.div`
    flex: 1;
    border-radius: 20px;
    border: 1px solid #e2e2e2;
    background: #f4f4f4;
    box-shadow: 0px 4px 12px -1px rgba(0, 0, 0, 0.1);
  `,
};
