import { useCallback, useEffect, useRef } from 'react';
import { dashboardSelector } from '@/stores/slices/Dashboard.slice';

export function useOutsideClickRef<T extends HTMLElement = HTMLDivElement>(
  callback?: () => void
): React.RefObject<T> {
  const { isInTour } = dashboardSelector();
  const ref = useRef<T>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (!callback) return;
      if (isInTour) return;

      if (ref.current && !ref.current.contains(event.target as Node)) {
        event.stopPropagation();
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return ref;
}
