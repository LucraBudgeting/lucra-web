import React, { useState } from 'react';
import styled from 'styled-components';

interface SplitViewProps {
  left: React.ReactNode;
  right: React.ReactNode;
  leftMinContainerWidth?: number;
  rightMinContainerWidth?: number;
  initialLeftContainerWidth?: number;
}

const SplitViewContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const SplitViewPane = styled.div<{ width: number }>`
  width: ${(props) => `${props.width}%`};
  padding: 10px;
  height: calc(100% - 10px);
  display: flex;
  flex-direction: column;
`;

const Divider = styled.div`
  width: 5px;
  background-color: #ccc;
  height: 98%;
  cursor: ew-resize;
  position: relative;
  border-radius: 10px;
`;

const Handle = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
  position: absolute;
  left: 0;
  top: 0;
  cursor: ew-resize;
`;

const SplitView: React.FC<SplitViewProps> = ({
  left,
  right,
  leftMinContainerWidth = 50,
  rightMinContainerWidth = 25,
  initialLeftContainerWidth = 75,
}) => {
  const [leftWidth, setLeftWidth] = useState(initialLeftContainerWidth);

  const handleDrag = (e: MouseEvent) => {
    const newLeftWidth = (e.clientX / window.innerWidth) * 100;

    if (newLeftWidth >= leftMinContainerWidth && newLeftWidth <= 100 - rightMinContainerWidth) {
      setLeftWidth(newLeftWidth);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <SplitViewContainer>
      <SplitViewPane width={leftWidth}>{left}</SplitViewPane>
      <Divider onMouseDown={(e) => e.preventDefault()}>
        <Handle onMouseDown={handleMouseDown} />
      </Divider>
      <SplitViewPane width={100 - leftWidth}>{right}</SplitViewPane>
    </SplitViewContainer>
  );
};

export default SplitView;
