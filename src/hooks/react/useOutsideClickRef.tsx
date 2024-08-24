import { useCallback, useEffect, useRef } from 'react';
import { dashboardSelector } from '@/stores/slices/Dashboard.slice';

export function useOutsideClickRef<T extends HTMLElement = HTMLDivElement>(
  callback?: () => void,
  excludeRefs: React.RefObject<HTMLElement>[] = []
): React.RefObject<T> {
  const { isInTour } = dashboardSelector();
  const ref = useRef<T>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (!callback) return;
      if (isInTour) return;

      const target = event.target as Node;

      const isClickInsideExcludedRef = excludeRefs.some(
        (excludeRef) => excludeRef.current && excludeRef.current.contains(target)
      );

      if (ref.current && !ref.current.contains(target) && !isClickInsideExcludedRef) {
        event.stopPropagation();
        callback();
      }
    },
    [callback, isInTour, excludeRefs]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return ref;
}
