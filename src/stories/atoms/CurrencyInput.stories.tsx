import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { CurrencyInput } from '@/atoms/input/CurrencyInput';

const meta = {
  title: 'atom/CurrencyInput',
  component: CurrencyInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { handleChange: fn() },
} satisfies Meta<typeof CurrencyInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialValue: 100,
  },
};
