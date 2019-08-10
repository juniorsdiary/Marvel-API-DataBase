import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchSingleCharacter } from '../../store/actions';
import * as types from '../../store/types';
import { convertToLocale } from '../../utilities/lib';
import ApiFactory from '../../utilities/apiFactory';

import Loader from '../../modules/Loader/Loader.jsx';
import ImageAvatar from '../../modules/ImageAvatar/ImageAvatar.jsx';
import ComicsSection from '../../modules/ComicsSection/ComicsSection.jsx';
import CharacterDetailsSection from '../../modules/CharacterDetailsSection/CharacterDetailsSection.jsx';

const CharacterPage = ({ fetchCharacterData, setFetchingState, isFetching, match, characterData }) => {
  const { name, description, modified, thumbnail, urls, comics } = characterData;
  const { path, extension } = thumbnail;

  useEffect(() => {
    const id = match.params.id;
    const charactersAPI = ApiFactory.createApiHandler({ type: 'characters', id });
    const apiStr = charactersAPI.createApiString();
    setFetchingState(true);
    fetchCharacterData(apiStr);
  }, [fetchCharacterData, match, setFetchingState]);

  let lastModified = convertToLocale(modified);

  return (
    <div className='page_content character_page_block'>
      {!isFetching ? (
        <div className='character_data_wrapper'>
          <ImageAvatar className='character_image_wrapper' src={`${path}.${extension}`} />
          <CharacterDetailsSection name={name} description={description} url={urls && urls[0].url} lastModified={lastModified} />
          <ComicsSection id={match.params.id} number={comics.available} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

CharacterPage.propTypes = {
  match: PropTypes.object,
  characterData: PropTypes.object,
  comicsData: PropTypes.array,
  fetchCharacterData: PropTypes.func,
  setFetchingState: PropTypes.func,
  fetchComicsData: PropTypes.func,
  isFetching: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    characterData: state.singleCharacter,
    isFetching: state.isFetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCharacterData: id => {
      dispatch(fetchSingleCharacter(id));
    },
    setFetchingState: boolean => {
      dispatch({ type: types.IS_FETCHING, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterPage);
