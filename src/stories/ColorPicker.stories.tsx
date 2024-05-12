import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ColorPicker } from '@/atoms/picker/ColorPicker';
import { ParentContainer } from './ParentContainer';

const meta = {
  title: 'atom/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: fn(),
  },
  args: { onClick: fn() },
  decorators: [(story) => <ParentContainer width="400px">{story()}</ParentContainer>],
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const SelectedColor: Story = {
  args: {
    selectedColor: '#49CCCB',
  },
};
