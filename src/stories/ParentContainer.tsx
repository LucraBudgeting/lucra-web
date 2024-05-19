import { FC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/stores/store';

interface ParentContainerProps {
  width?: string;
  height?: string;
  children: React.ReactNode;
}

export const ParentContainer: FC<ParentContainerProps> = ({ width, height, children }) => {
  return (
    <ReduxProvider store={store}>
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
    </ReduxProvider>
  );
};
