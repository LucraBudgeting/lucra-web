import { FC, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoadingComponent } from '@/atoms/loading/Loading.Component';
import { ProgressBar } from '@/atoms/progress/ProgressBar';
import { authRoutes } from '@/routes/RouteConstants';
import useClientDevice from '@/hooks/client/useClientDevice';
import { ApiContext } from '@/apis/api.context';
import { useAppDispatch } from '@/stores/store.hooks';
import { onboardingSelector, setIsCurrentPageLoading } from '@/stores/slices/Onboarding.slice';
import localStorageRepository from '@/utils/localStorage.repository';
import { OnboardingStep1Left, OnboardingStep1Right } from './OnboardingStep1';
import { StepperFooter } from './StepperFooter';
import { OnboardingStep2Left, OnboardingStep2Right } from './OnboardingStep2';
import { OnboardingStep3Left, OnboardingStep3Right } from './OnboardingStep3';
import { OnboardingStep4Left, OnboardingStep4Right } from './OnboardingStep4';
import { OnboardingStep5Left, OnboardingStep5Right } from './OnboardingStep5';

interface OnboardingDualCardContainerProps {}

const stages: { [key: string]: number[] } = {
  1: [1, 2],
  2: [3],
  3: [4],
  4: [5],
};

const isCurrentPageInStage = (page: number, stage: number): boolean => {
  return stages[stage].includes(page);
};

export const OnboardingContainerDesktop: FC<OnboardingDualCardContainerProps> = ({}) => {
  const { isDesktop } = useClientDevice();
  const dispatch = useAppDispatch();
  const { email, fullName, password, isCurrentPageLoading } = onboardingSelector();
  const apis = useContext(ApiContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentParams = new URLSearchParams(searchParams);
  const _userId = searchParams.get('userid');
  const currentStep = searchParams.get('step');

  const [currentPage, setCurrentPage] = useState<number>(currentStep ? parseInt(currentStep) : 1);

  const navigate = useNavigate();
  const totalPages = 5;

  useEffect(() => {
    // window.addEventListener('keydown', handleKeyPress);
    // // Cleanup the event listener on component unmount
    // return () => {
    //   window.removeEventListener('keydown', handleKeyPress);
    // };
  }, []);

  function handleKeyPress(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      nextPage();
    }
    if (e.key === 'Escape') {
      prevPage();
    }
  }

  const nextPage = () => {
    if (isCurrentPageInStage(currentPage, 1)) {
      checkStage1();
    } else if (isCurrentPageInStage(currentPage, 2)) {
      checkStage2();
    } else if (isCurrentPageInStage(currentPage, 3)) {
      checkStage3();
    } else if (isCurrentPageInStage(currentPage, 4)) {
      checkStage4();
    }

    currentParams.set('step', (currentPage + 1).toString());
    setSearchParams(currentParams);

    setCurrentPage((prev) => {
      if (prev === totalPages) return prev;

      return prev + 1;
    });
  };

  const prevPage = () => {
    currentParams.set('step', (currentPage - 1).toString());
    setSearchParams(currentParams);
    setCurrentPage((prev) => {
      if (prev === 1) {
        navigate(authRoutes.login);
      }
      return prev - 1;
    });
  };

  const checkStage1 = async () => {
    if (currentPage == 1) return;

    dispatch(setIsCurrentPageLoading(true));
    apis.onboardingApi.createAccount(email, fullName, password).then((res) => {
      localStorageRepository.setUserToken(res.token);
      location.href = res.checkoutUrl;
    });
  };

  const checkStage2 = async () => {};

  const checkStage3 = async () => {};

  const checkStage4 = async () => {};

  const { leftCard, rightCard } = getStepElement(currentPage);

  return (
    <Styled.container id="container">
      <Styled.cardContainer id="left">
        {isCurrentPageLoading ? (
          <LoadingComponent />
        ) : (
          <>
            <Styled.leftCardContent id="left-content">
              <ProgressBar currentPage={currentPage} totalPages={totalPages} />
              {leftCard}
            </Styled.leftCardContent>
            <StepperFooter
              prevPage={prevPage}
              nextPage={nextPage}
              isLastPage={currentPage == totalPages}
            />
          </>
        )}
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
    max-width: 650px;
    max-height: 650px;
    border-radius: 20px;
    border: 1px solid #e2e2e2;
    background: #f4f4f4;
    box-shadow: 0px 4px 12px -1px rgba(0, 0, 0, 0.1);
  `,
};
