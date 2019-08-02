import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCharacters } from './store/actions';
import { useClickAway } from 'react-use';

export const useFetchCharacters = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let params = {
      orderBy: 'name',
      limit: '60',
      toString: function() {
        return `orderBy=${this.orderBy}&limit=${this.limit}`;
      },
    };
    dispatch(fetchCharacters(params));
  }, [dispatch]);
};

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
    e => {
      setValues(e.target.value);
    },
  ];
};
