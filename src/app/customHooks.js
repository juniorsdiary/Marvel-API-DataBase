import { useEffect, useState } from 'react';

import { useClickAway } from 'react-use';

export const useFetchCharacters = () => {};

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

export const useFormSearch = initValues => {
  const [values, setValues] = useState(initValues);
  return [
    values,
    value => {
      setValues(value);
    },
  ];
};
