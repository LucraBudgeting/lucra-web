import { Meta, StoryObj } from '@storybook/react';
import { RefObject } from 'react';
import { CategoryListModal } from '@/components/category/CategoryListModal';

const meta = {
  title: 'modal/Category/List',
  component: CategoryListModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CategoryListModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    parentRef: null as unknown as RefObject<HTMLDivElement>,
    categoryClickCb: () => {},
  },
};
