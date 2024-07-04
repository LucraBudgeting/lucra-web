import { Meta, StoryObj } from '@storybook/react';
import { RefObject } from 'react';
import { CategoryList } from '@/components/category/CategoryList';

const meta = {
  title: 'modal/Category/List',
  component: CategoryList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CategoryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    parentRef: null as unknown as RefObject<HTMLDivElement>,
    categoryClickCb: () => {},
  },
};
