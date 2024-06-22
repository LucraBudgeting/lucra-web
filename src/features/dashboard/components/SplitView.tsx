import React, { useState } from 'react';
import styled from 'styled-components';

interface SplitViewProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

const SplitViewContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const SplitViewPane = styled.div<{ width: number }>`
  width: ${(props) => `${props.width}%`};
  overflow: auto;
  border: solid yellow 2px;
`;

const Divider = styled.div`
  width: 5px;
  background-color: #ccc;
  cursor: ew-resize;
  position: relative;
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

const SplitView: React.FC<SplitViewProps> = ({ left, right }) => {
  const [leftWidth, setLeftWidth] = useState(50);

  const handleDrag = (e: MouseEvent) => {
    const newLeftWidth = (e.clientX / window.innerWidth) * 100;
    setLeftWidth(newLeftWidth);
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
