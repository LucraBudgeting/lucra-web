import { useContext, useEffect, useState } from 'react';
import { GuideType, userGuideType } from '@/apis/guide/guide.type';
import { ApiContext } from '@/stores/contexts/api.context';
import { setInitialState, userGuideSelector } from '@/stores/slices/userGuide.slice';
import { useAppDispatch } from '@/stores/store.hooks';

type hookResponse = {
  guides: GuideType[];
  progress: Record<string, userGuideType>;
  isFetching: boolean;
};

export function useUserGuide(): hookResponse {
  const apis = useContext(ApiContext);
  const dispatch = useAppDispatch();
  const { guides, progress } = userGuideSelector();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    let isMounted = true;

    if (guides.length) {
      setIsFetching(false);
      return;
    }

    apis.userGuideApi
      .getGuideAndProgress()
      .then((response) => {
        if (!isMounted) return;

        dispatch(setInitialState(response));
      })
      .finally(() => {
        if (!isMounted) return;

        setIsFetching(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { guides, progress, isFetching };
}
