import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '@/providers/AppProvider';

interface ParentContainerProps {
  width?: string;
  height?: string;
  children: React.ReactNode;
}

export const ParentContainer: FC<ParentContainerProps> = ({ width, height, children }) => {
  return (
    <BrowserRouter>
      <AppProvider>
        <div
          style={{
            width: width ? width : '450px',
            height: height ? height : 'auto',
            border: 'dotted #d3d3d399 1px',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            padding: '16px',
          }}
        >
          {children}
        </div>
      </AppProvider>
    </BrowserRouter>
  );
};
