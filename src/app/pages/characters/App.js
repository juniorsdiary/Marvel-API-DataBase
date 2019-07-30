import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './app.scss';
import { fetchCharacters } from '../../store/actions';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  return <div className='caracters_wrapper'>Characters</div>;
};

export default App;
