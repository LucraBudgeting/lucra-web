import { FC, createElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
// eslint-disable-next-line
import 'https://cdn.skypack.dev/emoji-picker-element@^1';

interface EmojiPickerProps {
  onSelect?: (emoji: string) => void;
  currentEmoji?: string;
}

export const EmojiPicker: FC<EmojiPickerProps> = ({ onSelect, currentEmoji = '^' }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Styled.container>
      <Styled.currentEmoji onClick={() => setIsOpen(!isOpen)}>{currentEmoji}</Styled.currentEmoji>
      {isOpen && <EmojiSelector onSelect={onSelect} />}
    </Styled.container>
  );
};

const EmojiSelector: FC<{ onSelect?: (val: string) => void }> = ({ onSelect }) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    if (!ref?.current || !onSelect) {
      return;
    }

    (ref.current as any).addEventListener('emoji-click', (event: any) => {
      onSelect(event.detail.emoji.unicode);
    });
    (ref.current as any).skinToneEmoji = '👍';
  }, []);

  return createElement('emoji-picker', { ref });
};

const Styled = {
  container: styled.div``,
  currentEmoji: styled.p`
    cursor: pointer;
  `,
};
