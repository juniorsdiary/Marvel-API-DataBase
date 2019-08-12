import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchSingleCharacter } from '../../store/actions';
import * as types from '../../store/types';
import { convertToLocale } from '../../utilities/lib';
import ApiFactory from '../../utilities/apiFactory';

import Loader from '../../modules/Loader/Loader.jsx';
import ImageAvatar from '../../modules/ImageAvatar/ImageAvatar.jsx';
import ComicsSection from '../../modules/ComicsSection/ComicsSection.jsx';
import SeriesSection from '../../modules/SeriesSection/SeriesSection.jsx';
import EventsSection from '../../modules/EventsSection/EventsSection.jsx';
import StoriesSection from '../../modules/StoriesSection/StoriesSection.jsx';
import CharacterDetailsSection from '../../modules/CharacterDetailsSection/CharacterDetailsSection.jsx';

const CharacterPage = ({ fetchCharacterData, setFetchingState, isFetching, match, characterData }) => {
  const { name, description, modified, thumbnail, urls, comics, series, events, stories } = characterData;
  const { path, extension } = thumbnail;
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
          <ImageAvatar className='character_image_wrapper' baseSrc={`${path}/portrait_small.${extension}`} src={`${path}.${extension}`} />
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
