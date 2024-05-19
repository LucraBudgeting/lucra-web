import { Meta, StoryObj } from '@storybook/react';
import { OnboardingContainerDesktop } from '@/components/onboarding/desktop/OnboardingContainerDesktop';
import { ParentContainer } from '../ParentContainer';

const meta = {
  title: 'onboarding/OnboardingContainerDesktop',
  component: OnboardingContainerDesktop,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
  decorators: [
    (story) => (
      <ParentContainer width="900px" height="500px">
        {story()}
      </ParentContainer>
    ),
  ],
} satisfies Meta<typeof OnboardingContainerDesktop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
