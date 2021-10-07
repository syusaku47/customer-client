import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * query param の取得
 */
export const useQuery = (name:string) => {
  const location = useLocation().search;
  return useMemo(() => new URLSearchParams(location).get(name), [location, name]);
};
