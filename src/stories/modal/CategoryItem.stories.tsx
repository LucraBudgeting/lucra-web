import { Meta, StoryObj } from '@storybook/react';
import { CategoryItem } from '@/components/category/CategoryItem';
import { createShortGuid } from '@/utils/guid.helper';

const meta = {
  title: 'modal/Category/Item',
  component: CategoryItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CategoryItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Eating Out',
    budgetType: 'debit',
    amount: 0,
    avatar: {
      emoji: '🍔',
      backgroundColor: '#FDF9A9',
    },
    id: createShortGuid(),
    categoryClickCb: (_id?: string) => {},
  },
};
