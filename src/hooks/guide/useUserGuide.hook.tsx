import { useContext, useEffect } from 'react';
import { GuideType, userGuideType } from '@/apis/guide/guide.type';
import { ApiContext } from '@/stores/contexts/api.context';
import { setInitialState, userGuideSelector } from '@/stores/slices/userGuide.slice';
import { useAppDispatch } from '@/stores/store.hooks';

type hookResponse = {
  guides: GuideType[];
  progress: Record<string, userGuideType>;
};

export function useUserGuide(): hookResponse {
  const apis = useContext(ApiContext);
  const dispatch = useAppDispatch();
  const { guides, progress } = userGuideSelector();

  useEffect(() => {
    let isMounted = true;

    if (guides.length) return;

    apis.userGuideApi.getGuideAndProgress().then((response) => {
      if (!isMounted) return;

      dispatch(setInitialState(response));
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return { guides, progress };
}
