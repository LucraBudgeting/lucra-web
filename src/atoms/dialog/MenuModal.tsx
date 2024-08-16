import { FC, useRef, useState } from 'react';
import styled from 'styled-components';
import { ElipsesIcon } from '@/assets/elipses-icon';
import { useOutsideClickRef } from '@/hooks/react/useOutsideClickRef';
import { maxZIndex } from '@/utils/domConstants';

export interface menuButtonProps {
  onClick: () => void;
  text: string;
  icon?: React.ReactNode;
  color?: string;
}

interface MenuModalProps {
  buttons: menuButtonProps[];
}

const defaultModalStyle = {
  display: 'flex',
};

export const MenuModal: FC<MenuModalProps> = ({ buttons }) => {
  const elipsesRef = useRef<SVGSVGElement>(null);
  const modalRef = useOutsideClickRef(onOutsideClick);

  const [modalStyle, setModalStyle] = useState<React.CSSProperties>(defaultModalStyle);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function onOutsideClick() {
    setIsMenuOpen(false);
    setModalStyle(defaultModalStyle);
  }

  function onElipsesClick() {
    setIsMenuOpen((prev) => !prev);

    if (elipsesRef.current) {
      setModalStyle({
        position: 'fixed',
        top: '2rem',
        right: '3rem',
        zIndex: maxZIndex + 5000,
      });
      setIsMenuOpen(true);
    }
  }

  return (
    <Styled.container>
      <ElipsesIcon forwardRef={elipsesRef} onClick={onElipsesClick} />
      {isMenuOpen && (
        <Styled.modal ref={modalRef} style={modalStyle}>
          {buttons.map((button, index) => (
            <Styled.item
              key={index}
              color={button.color}
              onClick={() => {
                button.onClick();
                onOutsideClick();
              }}
            >
              {button.icon}
              <p>{button.text}</p>
            </Styled.item>
          ))}
        </Styled.modal>
      )}
    </Styled.container>
  );
};

const Styled = {
  container: styled.div`
    cursor: pointer;
    position: relative;
  `,
  modal: styled.div`
    border-radius: 12px;
    border: 1px solid #e2e2e2;
    box-shadow: 0px 2px 6px 0px #0000000f;
    background-color: #ffffff;
    display: inline-flex;
    flex-direction: column;
  `,
  item: styled.div<{ color?: string }>`
    cursor: pointer;
    padding: 24px;
    display: flex;
    gap: 1rem;
    border-radius: 12px;

    border-bottom: 1px solid #e2e2e2;

    transition: all ease-in 0.4s;
    transition: all ease-out 0.2s;

    p {
      color: ${(props) => props.color || '#333'};
      width: 80%;
    }

    &:hover {
      background: #f8f8f8;
    }
  `,
};
