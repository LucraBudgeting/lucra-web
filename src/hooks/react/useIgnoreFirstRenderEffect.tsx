import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

// Custom hook that ignores the first render
const useIgnoreFirstRenderUseEffect = (effect: EffectCallback, deps?: DependencyList): void => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    effect();
    // Dependencies are intentionally spread here to adhere to user-specified deps
  }, deps);
};

export default useIgnoreFirstRenderUseEffect;
