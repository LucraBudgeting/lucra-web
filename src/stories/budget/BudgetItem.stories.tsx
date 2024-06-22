import type { Meta, StoryObj } from '@storybook/react';
import { BudgetItem } from '@/components/budget/BudgetItem';
import { ParentContainer } from '../ParentContainer';
import BudgetList from '../__mocks/BudgetList';

const meta = {
  title: 'budget/BudgetItem',
  component: BudgetItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [(story) => <ParentContainer width="800px">{story()}</ParentContainer>],
} satisfies Meta<typeof BudgetItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: BudgetList.Default,
};

export const CreditNoRemaining: Story = {
  args: BudgetList.CreditNoRemaining,
};

export const CreditRemaining: Story = {
  args: BudgetList.CreditRemaining,
};

export const DebitNoRemaining: Story = {
  args: BudgetList.DebitNoRemaining,
};

export const DebitRemaining: Story = {
  args: BudgetList.DebitRemaining,
};
