import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CharacterCard from '../../modules/CharacterCard/CharacterCard.jsx';
import SearchComponent from '../../modules/SearchComponent/SearchComponent.jsx';
import ParametrsComponent from '../../modules/ParametrsComponent/ParametrsComponent.jsx';
import Loader from '../../modules/Loader/Loader.jsx';
import { fetchCharacters } from '../../store/actions';

const App = () => {
  const dispatch = useDispatch();
  const charactersList = useSelector(state => state.charactersList);
  const isFetching = useSelector(state => state.isFetching);
  useEffect(() => {
    if (charactersList.length === 0) {
      dispatch({ type: 'IS_FETCHING', payload: true });
      dispatch(fetchCharacters());
    }
  }, [dispatch, charactersList]);

  const submitValue = useCallback(
    value => {
      dispatch({ type: 'IS_FETCHING', payload: true });
      dispatch(fetchCharacters(value));
    },
    [dispatch]
  );

  const renderCharacters = charactersList.map(character => <CharacterCard key={character.id} {...character} />);
  return (
    <div className='page_content characters_wrapper'>
      <SearchComponent>
        <ParametrsComponent submitValue={submitValue} />
      </SearchComponent>
      {!isFetching ? <div className='characters_cards_wrapper'>{renderCharacters}</div> : <Loader />}
    </div>
  );
};

export default App;
