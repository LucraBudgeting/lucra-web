import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface ToggleSwitchProps {
  options: string[];
  defaultValue?: string;
  onToggle: (value: string) => void;
}
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ options, defaultValue, onToggle }) => {
  const defaultIndex = defaultValue ? options.indexOf(defaultValue) : 0;
  const [activeIndex, setActiveIndex] = useState(defaultIndex || 0);
  const switchRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (switchRef.current && markerRef.current) {
      const switchWidth = switchRef.current.offsetWidth;
      const markerWidth = markerRef.current.offsetWidth;
      const spacePerOption = switchWidth / options.length;
      const offset = (spacePerOption - markerWidth) / 2;
      const newPosition = activeIndex * spacePerOption + offset;
      markerRef.current.style.transform = `translateX(${newPosition}px)`;
    }
  }, [activeIndex, options.length]);

  const handleToggle = (index: number) => {
    setActiveIndex(index);
    onToggle(options[index]);
  };

  return (
    <Styled.container ref={switchRef}>
      <Styled.marker width={`${100 / options.length}%`} ref={markerRef}></Styled.marker>
      {options.map((option, index) => (
        <Styled.toggleButton
          width={`${100 / options.length}%`}
          key={option}
          onClick={() => handleToggle(index)}
        >
          {option}
        </Styled.toggleButton>
      ))}
    </Styled.container>
  );
};

export default ToggleSwitch;

const Styled = {
  container: styled.div`
    position: relative;
    display: inline-flex;
    align-items: center;
    background-color: #f3f3f3;
    border-radius: 20px;
    overflow: hidden;
    color: black;
    padding: 4px;
    gap: 0;
  `,
  marker: styled.div<{ width: string }>`
    position: absolute;
    z-index: 1;
    top: 5px;
    bottom: 5px;
    left: 0px;
    right: 0px;
    width: calc(${({ width }) => width} - 10px);
    background-color: #fff;
    border-radius: 20px;
    transition: transform 0.3s ease;
    box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.1);
  `,
  toggleButton: styled.button<{ width: string }>`
    position: relative;
    z-index: 2;
    background-color: transparent;
    border: none;
    outline: none;
    padding: 8px 20px;
    cursor: pointer;
    font-size: 16px;
    flex: 1;
    transition: background-color 0.3s ease;
    color: black;
    text-align: center;
    width: ${({ width }) => width};
    font-weight: 500;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  `,
};
