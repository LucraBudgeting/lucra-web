import { Meta, StoryObj } from '@storybook/react';
import { ChangeEvent } from 'react';
import { EditOrAddCategory } from '@/components/budget/EditOrAddCategory';

const meta = {
  title: 'modal/Category/EditOrAddCategory',
  component: EditOrAddCategory,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof EditOrAddCategory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    budgetType: '',
    onBudgetTypeChange: (_budgetType: string) => {},
    label: '',
    onLabelChange: (_e: ChangeEvent<HTMLInputElement>) => {},
    currentEmoji: '',
    onEmojiChange: (_emoji: string) => {},
    budgetedAmount: 0,
    onBudgetedChange: (_budgeted: number) => {},
  },
};

export const InitialAmount: Story = {
  args: {
    budgetType: '',
    onBudgetTypeChange: (_budgetType: string) => {},
    label: '',
    onLabelChange: (_e: ChangeEvent<HTMLInputElement>) => {},
    currentEmoji: '',
    onEmojiChange: (_emoji: string) => {},
    budgetedAmount: 0,
    onBudgetedChange: (_budgeted: number) => {},
  },
};

export const AddCategory: Story = {
  args: {
    budgetType: '',
    onBudgetTypeChange: (_budgetType: string) => {},
    label: '',
    onLabelChange: (_e: ChangeEvent<HTMLInputElement>) => {},
    currentEmoji: '',
    onEmojiChange: (_emoji: string) => {},
    budgetedAmount: 0,
    onBudgetedChange: (_budgeted: number) => {},
  },
};
