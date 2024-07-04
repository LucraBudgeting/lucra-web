import { useCallback, useEffect, useRef } from 'react';

export function useOutsideClickRef<T extends HTMLElement = HTMLDivElement>(
  callback?: () => void
): React.RefObject<T> {
  const ref = useRef<T>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (!callback) return;

      if (ref.current && !ref.current.contains(event.target as Node)) {
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
