import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../../store/actions';
import CharacterCard from '../../modules/CharacterCard.jsx';
import FilterSettings from '../../modules/FilterSettings.jsx';

import './style.scss';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let params = {
      orderBy: 'name',
      limit: '20',
      toString: function() {
        return `orderBy=${this.orderBy}&limit=${this.limit}`;
      },
    };
    dispatch(fetchCharacters(params));
  }, [dispatch]);
  const charactersList = useSelector(state => state.charactersList);
  const renderCharacters = charactersList.map(character => <CharacterCard key={character.id} {...character} />);
  return (
    <div className='page_content caracters_wrapper'>
      <h1>Characters</h1>
      <FilterSettings />
      {renderCharacters}
    </div>
  );
};

export default App;
