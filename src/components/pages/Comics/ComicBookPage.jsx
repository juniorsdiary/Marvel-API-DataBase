import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { types, fetchCharacters, fetchEvents, fetchSingleComicBook } from 'Store';
import { convertToLocale, ApiFactory } from 'Utilities';
import { Loader, ImageAvatar, AccordeonSection, DetailsSection, SearchCard, PreviewItem, CharacterCard } from 'Modules';
import { withDataFetching } from 'Components/hocs';

const AccordeonCharactersWithDataFetching = withDataFetching('/characters')(AccordeonSection);
const AccordeonEventsWithDataFetching = withDataFetching('/events')(AccordeonSection);

const ComicBookPage = props => {
  const { isFetching, charactersFetching, eventsFetching, location } = props;
  const { fetchedData, storeData, charactersData, eventsData } = props;
  const { fetchComicsData, fetchCharacterData, fetchEventsData, setFetchingState } = props;
  const { title, description, modified, thumbnail, urls, characters, creators, events } = storeData || fetchedData;

  useEffect(() => {
    const charactersAPI = ApiFactory.createApiHandler({ pathname: location.pathname });
    const apiStr = charactersAPI.createApiString();
    if (!storeData) {
      setFetchingState(types.COMICS_FETCHING, true);
      fetchComicsData(apiStr);
    }
  }, [fetchComicsData, location, setFetchingState, storeData]);

  const baseSrc = thumbnail.path ? `${thumbnail.path}/portrait_small.${thumbnail.extension}` : '';
  const src = thumbnail.path ? `${thumbnail.path}.${thumbnail.extension}` : '';

  const lastModified = convertToLocale(modified);

  const renderCharacters = charactersData.map(item => <CharacterCard key={item.id} {...item} />);
  const renderCreators = creators.items.map((item, index) => <PreviewItem key={index} {...item} />);
  const renderEvents = eventsData.map(item => <SearchCard key={item.id} {...item} pathname={'/events'} />);

  return (
    <div className='page_content'>
      {isFetching ? (
        <Loader />
      ) : (
        <div className='items_data_wrapper'>
          <ImageAvatar wrapper={true} className='cover_book_image' baseSrc={baseSrc} src={src} />
          <DetailsSection name={title} description={description} url={urls && urls[0].url} lastModified={lastModified} />
          <AccordeonSection
            number={creators.available}
            location={location}
            pathname={'/creators'}
            content={renderCreators}
            slider={false}
            contentClassName='creators_content_block'
            title={`${creators.available} creators`}
          />
          <AccordeonCharactersWithDataFetching
            fetchingCallBack={bool => setFetchingState(types.CHARACTERS_FETCHING, bool)}
            loading={charactersFetching}
            number={characters.available}
            location={location}
            content={renderCharacters}
            slider={true}
            contentClassName='default_slider_block'
            callBack={fetchCharacterData}
            title={`You can meet ${characters.available} characters`}
          />
          <AccordeonEventsWithDataFetching
            fetchingCallBack={bool => setFetchingState(types.EVENTS_FETCHING, bool)}
            loading={eventsFetching}
            number={events.available}
            location={location}
            content={renderEvents}
            slider={true}
            contentClassName='default_content_block'
            callBack={fetchEventsData}
            title={`Part of ${events.available} events`}
          />
        </div>
      )}
    </div>
  );
};

ComicBookPage.propTypes = {
  storeData: PropTypes.object,
  fetchedData: PropTypes.object,
  charactersData: PropTypes.array,
  eventsData: PropTypes.array,
  comicBookData: PropTypes.object,
  fetchCharacterData: PropTypes.func,
  fetchEventsData: PropTypes.func,
  fetchComicsData: PropTypes.func,
  setFetchingState: PropTypes.func,
  charactersFetching: PropTypes.bool,
  eventsFetching: PropTypes.bool,
  isFetching: PropTypes.bool,
  location: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id);
  return {
    storeData: state.comicsData.comicsList.filter(item => item.id === id)[0],
    fetchedData: state.comicsData.comicBook,
    charactersData: state.charactersData.charactersList,
    eventsData: state.eventsData.eventsList,
    charactersFetching: state.charactersData.isFetching,
    eventsFetching: state.eventsData.isFetching,
    isFetching: state.comicsData.isFetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCharacterData: url => {
      dispatch(fetchCharacters(url));
    },
    fetchEventsData: url => {
      dispatch(fetchEvents(url));
    },
    fetchComicsData: url => {
      dispatch(fetchSingleComicBook(url));
    },
    setFetchingState: (type, boolean) => {
      dispatch({ type: type, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComicBookPage);
