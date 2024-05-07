import { FC } from 'react';

interface ParentContainerProps {
  width?: string;
  height?: string;
  children: React.ReactNode;
}

export const ParentContainer: FC<ParentContainerProps> = ({ width, children }) => {
  return (
    <div
      style={{
        width: width ? width : '450px',
        border: 'dotted #d3d3d399 1px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        padding: '16px',
      }}
    >
      {children}
    </div>
  );
};
