import { Meta, StoryObj } from '@storybook/react';
import { CategoryBudgetDetails } from '@/components/budget/CategoryBudgetDetails';

const meta = {
  title: 'modal/Category/BudgetDetails',
  component: CategoryBudgetDetails,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CategoryBudgetDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
