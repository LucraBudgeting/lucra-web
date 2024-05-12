import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { EmojiPicker } from '@/atoms/picker/EmojiPicker';
import { ParentContainer } from './ParentContainer';

const meta = {
  title: 'atom/EmpjiPicker',
  component: EmojiPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSelect: fn(),
  },
  args: { onSelect: fn() },
  decorators: [(story) => <ParentContainer width="400px">{story()}</ParentContainer>],
} satisfies Meta<typeof EmojiPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentEmoji: '👍',
  },
};
