import { FC } from 'react';

interface AvatarEmojiProps {
  emoji: string;
  backgroundColor: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AvatarEmoji: FC<AvatarEmojiProps> = ({ emoji, backgroundColor, size = 'md' }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: size === 'sm' ? '24px' : size === 'md' ? '32px' : '48px',
        height: size === 'sm' ? '24px' : size === 'md' ? '32px' : '48px',
        borderRadius: '50%',
        backgroundColor,
      }}
    >
      <span style={{ fontSize: size === 'sm' ? '12px' : size === 'md' ? '16px' : '24px' }}>
        {emoji}
      </span>
    </div>
  );
};
