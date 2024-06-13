import { FC, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ApiContext } from '@/apis/api.context';
import { siteImageUrls } from '@/assets/site-image-urls';
import { addCategories, onboardingSelector } from '@/stores/slices/Onboarding.slice';
import { getCurrentYear, getFullMonth } from '@/utils/time.helper';
import { AddBudgetCategory } from './AddBudgetCategory';
import { styles } from './Styles';

interface OnboardingStep5Props {}

export const OnboardingStep5Left: FC<OnboardingStep5Props> = ({}) => {
  const dispatch = useDispatch();
  const { categoryApi } = useContext(ApiContext);

  useEffect(() => {
    document.title = 'Create your budget';
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    categoryApi.GetCategories().then((response) => {
      dispatch(addCategories(response.categories));
    });
  }

  return (
    <Styled.left>
      <Styled.leftTextContainer>
        <h1>Create your budget</h1>
        <h3>
          Set up your account to get started. This helps us keep your financial information safe and
          secure.
        </h3>
        <AddBudgetCategory type="Income" />
      </Styled.leftTextContainer>
    </Styled.left>
  );
};

export const OnboardingStep5Right: FC<OnboardingStep5Props> = ({}) => {
  const { categories, step5Stage } = onboardingSelector();

  return (
    <Styled.right>
      {categories.length === 0 && <Styled.rightImage src={siteImageUrls.logo_secondary} />}
      {categories.length > 0 && (
        <div>
          <h1>
            {getFullMonth()} {getCurrentYear()}
          </h1>
          <h2>Income Categories</h2>
          <ul>
            {categories
              .filter((category) => category.budgetType === step5Stage)
              .map((category) => (
                <li key={category.id}>{category.label}</li>
              ))}
          </ul>
        </div>
      )}
    </Styled.right>
  );
};

const Styled = {
  ...styles,
};
