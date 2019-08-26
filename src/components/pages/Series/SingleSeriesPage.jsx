import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCharacters, fetchEvents, fetchComics, types } from 'Store';
import { convertToLocale } from 'Utilities';
import { ImageAvatar, AccordeonSection, DetailsSection, SearchCard, PreviewItem, CharacterCard } from 'Modules';
import { withDataFetching } from 'Components/hocs';

const AccordeonCharactersWithDataFetching = withDataFetching('/characters')(AccordeonSection);
const AccordeonEventsWithDataFetching = withDataFetching('/events')(AccordeonSection);
const AccordeonComicsWithDataFetching = withDataFetching('/comics')(AccordeonSection);

const SingleSeriesPage = props => {
  const { charactersFetching, eventsFetching, comicsFetching, location } = props;
  const { seriesItemData, charactersData, eventsData, comicsData } = props;
  const { fetchCharacterData, fetchEventsData, fetchComicsData, setFetchingState } = props;
  const { title, description, modified, thumbnail, urls, comics, creators, characters, events } = seriesItemData;

  const baseSrc = thumbnail.path ? `${thumbnail.path}/portrait_small.${thumbnail.extension}` : '';
  const src = thumbnail.path ? `${thumbnail.path}.${thumbnail.extension}` : '';

  const lastModified = convertToLocale(modified);
  // console.log(seriesItemData.next);
  // console.log(seriesItemData.previous);
  const renderCharacters = charactersData.map(item => <CharacterCard key={item.id} {...item} />);
  const renderCreators = creators.items.map((item, index) => <PreviewItem key={index} {...item} />);
  const renderEvents = eventsData.map(item => <SearchCard key={item.id} {...item} pathname={'/events'} />);
  const renderComics = comicsData.map(item => <SearchCard key={item.id} {...item} pathname={'/comics'} />);
  return (
    <div className='page_content'>
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
        <AccordeonComicsWithDataFetching
          fetchingCallBack={bool => setFetchingState(types.COMICS_FETCHING, bool)}
          loading={comicsFetching}
          number={comics.available}
          location={location}
          content={renderComics}
          slider={true}
          contentClassName='default_slider_block'
          callBack={fetchComicsData}
          title={`Contains ${comics.available} comics`}
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
    </div>
  );
};

SingleSeriesPage.propTypes = {
  charactersData: PropTypes.array,
  eventsData: PropTypes.array,
  seriesItemData: PropTypes.object,
  comicsData: PropTypes.array,
  fetchCharacterData: PropTypes.func,
  fetchEventsData: PropTypes.func,
  fetchComicsData: PropTypes.func,
  setFetchingState: PropTypes.func,
  charactersFetching: PropTypes.bool,
  eventsFetching: PropTypes.bool,
  comicsFetching: PropTypes.bool,
  location: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id);
  return {
    charactersData: state.charactersData.charactersList,
    eventsData: state.eventsData.eventsList,
    seriesItemData: state.seriesData.seriesList.charactersList.filter(item => item.id === id)[0],
    comicsData: state.comicsData.comicsList,
    charactersFetching: state.charactersData.isFetching,
    eventsFetching: state.eventsData.isFetching,
    comicsFetching: state.comicsData.isFetching,
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
      dispatch(fetchComics(url));
    },
    setFetchingState: (type, boolean) => {
      dispatch({ type: type, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleSeriesPage);
