import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from '@/atoms/progress/ProgressBar';
import { ParentContainer } from '../ParentContainer';

const meta = {
  title: 'onboarding/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
  decorators: [(story) => <ParentContainer width="800px">{story()}</ParentContainer>],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 6,
  },
};

export const page2: Story = {
  args: {
    currentPage: 2,
    totalPages: 6,
  },
};

export const page3: Story = {
  args: {
    currentPage: 3,
    totalPages: 6,
  },
};

export const page4: Story = {
  args: {
    currentPage: 4,
    totalPages: 6,
  },
};

export const page5: Story = {
  args: {
    currentPage: 5,
    totalPages: 6,
  },
};

export const page6: Story = {
  args: {
    currentPage: 6,
    totalPages: 6,
  },
};
