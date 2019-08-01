import React from 'react';
import { useSelector } from 'react-redux';
import useFetchCharacters from '../../customHooks.js';
import CharacterCard from '../../modules/CharacterCard.jsx';
import FilterSettings from '../../modules/FilterSettings/FilterSettings.jsx';

const App = () => {
  useFetchCharacters();
  const charactersList = useSelector(state => state.charactersList);
  const renderCharacters = charactersList.map(character => <CharacterCard key={character.id} {...character} />);
  return (
    <div className='page_content characters_wrapper'>
      <FilterSettings />
      <div className='characters_cards_wrapper'>{renderCharacters}</div>
    </div>
  );
};

export default App;
