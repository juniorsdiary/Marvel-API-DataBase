import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchSingleCharacter } from '../../store/actions/characters';
import * as types from '../../store/types';
import { convertToLocale } from '../../utilities/lib';
import ApiFactory from '../../utilities/apiFactory';

import Loader from '../../modules/Loader/Loader.jsx';
import ImageAvatar from '../../modules/ImageAvatar/ImageAvatar.jsx';
import ComicsSection from '../../modules/AccordeonSections/ComicsSection.jsx';
import SeriesSection from '../../modules/AccordeonSections/SeriesSection.jsx';
import EventsSection from '../../modules/AccordeonSections/EventsSection.jsx';
// import StoriesSection from '../../modules/StoriesSection/StoriesSection.jsx';
import CharacterDetailsSection from '../../modules/CharacterDetailsSection/CharacterDetailsSection.jsx';

const CharacterPage = ({ fetchCharacterData, setFetchingState, isFetching, match, characterData }) => {
  const { name, description, modified, thumbnail, urls, comics, series, events, stories } = characterData;
  const baseSrc = thumbnail.path ? `${thumbnail.path}/portrait_small.${thumbnail.extension}` : '';
  const src = thumbnail ? `${thumbnail.path}.${thumbnail.extension}` : '';
  useEffect(() => {
    const id = match.params.id;
    const charactersAPI = ApiFactory.createApiHandler({ type: 'characters', id });
    const apiStr = charactersAPI.createApiString();
    setFetchingState(true);
    fetchCharacterData(apiStr);
  }, [fetchCharacterData, match, setFetchingState]);

  const lastModified = convertToLocale(modified);
  const [{ firstContent, secondContent, thirdContent, fourthContent }, setActive] = useState({
    firstContent: true,
    secondContent: true,
    thirdContent: true,
    fourthContent: true,
  });
  const handleChange = (name, bool) => {
    setActive(state => ({ ...state, [name]: bool }));
  };
  return (
    <div className='page_content character_page_block'>
      {!isFetching ? (
        <div className='character_data_wrapper'>
          <ImageAvatar className='character_image_wrapper' baseSrc={baseSrc} src={src} />
          <CharacterDetailsSection name={name} description={description} url={urls && urls[0].url} lastModified={lastModified} />

          <ComicsSection
            id={match.params.id}
            number={comics.available}
            state={firstContent}
            changeState={() => handleChange('firstContent', !firstContent)}
          />
          <SeriesSection
            id={match.params.id}
            number={series.available}
            state={secondContent}
            changeState={() => handleChange('secondContent', !secondContent)}
          />
          <EventsSection
            id={match.params.id}
            number={events.available}
            state={thirdContent}
            changeState={() => handleChange('thirdContent', !thirdContent)}
          />
          {/* <StoriesSection
            id={match.params.id}
            number={stories.available}
            state={fourthContent}
            changeState={() => handleChange('fourthContent', !fourthContent)}
          /> */}
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
  fetchCharacterData: PropTypes.func,
  setFetchingState: PropTypes.func,
  fetchComicsData: PropTypes.func,
  isFetching: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    characterData: state.charactersData.singleCharacter,
    isFetching: state.charactersData.isFetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCharacterData: id => {
      dispatch(fetchSingleCharacter(id));
    },
    setFetchingState: boolean => {
      dispatch({ type: types.CHARACTERS_FETCHING, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterPage);
