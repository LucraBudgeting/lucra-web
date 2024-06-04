import { Meta, StoryObj } from '@storybook/react';
import { AddBudgetCategory } from '@/components/onboarding/desktop/AddBudgetCategory';
import { ParentContainer } from '../ParentContainer';

const meta = {
  title: 'onboarding/AddBudgetCategory',
  component: AddBudgetCategory,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
  decorators: [
    (story) => (
      <ParentContainer width="400px" height="200px">
        {story()}
      </ParentContainer>
    ),
  ],
} satisfies Meta<typeof AddBudgetCategory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'Income',
  },
};

export const Expense: Story = {
  args: {
    type: 'Expense',
  },
};
