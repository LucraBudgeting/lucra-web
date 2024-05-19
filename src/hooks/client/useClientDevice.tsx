import { useState, useEffect } from 'react';

const smallestDesktop = 1200;

const useClientDevice = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= smallestDesktop);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      setIsMobile(window.innerWidth <= smallestDesktop);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const clientDevice = isMobile ? 'mobile' : 'desktop';

  return { windowSize, isMobile, isDesktop: !isMobile, clientDevice };
};

export default useClientDevice;
