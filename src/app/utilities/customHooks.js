import { useState } from 'react';
import { useClickAway } from 'react-use';

export const useToogleSearch = ref => {
  const [hiddenState, toogleHiddenState] = useState(true);
  const constructedClass = hiddenState ? 'filter_parametrs_block hidden_block' : 'filter_parametrs_block';
  useClickAway(ref, () => {
    !hiddenState && toogleHiddenState(true);
  });
  return [
    constructedClass,
    () => {
      toogleHiddenState(!hiddenState);
    },
  ];
};
