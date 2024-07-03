import { FC, createElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
// eslint-disable-next-line
import 'https://cdn.skypack.dev/emoji-picker-element@^1';

interface EmojiPickerProps {
  onSelect?: (emoji: string) => void;
  currentEmoji?: string;
}

export const EmojiPicker: FC<EmojiPickerProps> = ({ onSelect, currentEmoji = '^' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (val: string) => {
    if (onSelect) {
      onSelect(val);
    }
    setIsOpen(false);
  };

  return (
    <Styled.container ref={containerRef}>
      <Styled.currentEmoji onClick={() => setIsOpen(!isOpen)}>{currentEmoji}</Styled.currentEmoji>
      {isOpen && containerRef.current && (
        <Styled.selectorContainer>
          <EmojiSelector onSelect={handleSelect} />
        </Styled.selectorContainer>
      )}
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
  container: styled.div`
    /* position: relative; */
  `,
  currentEmoji: styled.p`
    color: var(--Grey-Dark, #333);
    text-align: center;
    font-family: Inter;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 34px; /* 106.25% */
    cursor: pointer;
  `,
  selectorContainer: styled.div`
    position: absolute;
    width: 300px; // Adjust width as needed
    z-index: 2000; // Ensures it is on top of other elements
    left: calc((100vw / 2.5));
    border-radius: 8px;
  `,
};
