import { useContext } from 'react';

import { FrontContext } from '../context/FrontContext';

export function useFrontContext() {
  return useContext(FrontContext);
}

