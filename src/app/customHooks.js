import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCharacters } from './store/actions';

const useFetchCharacters = () => {
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
export default useFetchCharacters;
