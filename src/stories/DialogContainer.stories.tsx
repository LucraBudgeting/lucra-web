import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { DiaglogContainer } from '@/atoms/dialog/DiaglogContainer';

const meta = {
  title: 'atom/Dialog',
  component: DiaglogContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { closeCb: fn(), successCb: fn() },
} satisfies Meta<typeof DiaglogContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headerText: 'Dialog Header',
    editCb: fn(),
    enableHeader: true,
    enableFooter: true,
    closeButton: true,
    successButton: true,
    closeOnOverlayClick: false,
    width: '540px',
    height: '500px',
    children: <div>I AM CHILD</div>,
  },
};

export const NoHeader: Story = {
  args: {
    headerText: 'Dialog Header',
    editCb: fn(),
    enableHeader: false,
    enableFooter: true,
    closeButton: true,
    successButton: true,
    closeOnOverlayClick: false,
    width: '540px',
    height: '500px',
    children: <div>I AM CHILD</div>,
  },
};

export const NoFooter: Story = {
  args: {
    headerText: 'Dialog Header',
    editCb: fn(),
    enableHeader: true,
    enableFooter: false,
    closeButton: true,
    successButton: true,
    closeOnOverlayClick: false,
    width: '540px',
    height: '500px',
    children: <div>I AM CHILD</div>,
  },
};

export const NoCloseButton: Story = {
  args: {
    headerText: 'Dialog Header',
    editCb: fn(),
    enableHeader: true,
    enableFooter: true,
    closeButton: false,
    successButton: true,
    closeOnOverlayClick: false,
    width: '540px',
    height: '500px',
    children: <div>I AM CHILD</div>,
  },
};
