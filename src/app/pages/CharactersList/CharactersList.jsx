import React from 'react';
import { useSelector } from 'react-redux';
import { useFetchCharacters } from '../../customHooks.js';
import CharacterCard from '../../modules/CharacterCard.jsx';
import SearchComponent from '../../modules/SearchComponent/SearchComponent.jsx';
import ParametrsComponent from '../../modules/ParametrsComponent/ParametrsComponent.jsx';
const App = () => {
  useFetchCharacters();
  const charactersList = useSelector(state => state.charactersList);
  const renderCharacters = charactersList.map(character => <CharacterCard key={character.id} {...character} />);
  return (
    <div className='page_content characters_wrapper'>
      <SearchComponent>
        <ParametrsComponent />
      </SearchComponent>
      <div className='characters_cards_wrapper'>{renderCharacters}</div>
    </div>
  );
};

export default App;
