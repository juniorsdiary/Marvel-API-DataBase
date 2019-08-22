import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchSingleSeries } from 'Store/actions/series';
import { fetchCharacters } from 'Store/actions/characters';
import { fetchEvents } from 'Store/actions/events';
import { fetchComics } from 'Store/actions/comics';
import * as types from 'Store/types';
import { convertToLocale } from 'Utilities/lib';
import ApiFactory from 'Utilities/apiFactory';

import Loader from 'Modules/Loader/Loader.jsx';
import ImageAvatar from 'Modules/ImageAvatar/ImageAvatar.jsx';
import AccordeonSection from 'Modules/AccordeonSections/AccordeonSection.jsx';
import DetailsSection from 'Modules/DetailsSection/DetailsSection.jsx';
import SearchCard from 'Modules/SearchCard/SearchCard.jsx';
import PreviewItem from 'Modules/PreviewItem/PreviewItem.jsx';
import CharacterCard from 'Modules/CharacterCard/CharacterCard.jsx';
import { withDataFetching } from 'Components/hocs.jsx';

const AccordeonCharactersWithDataFetching = withDataFetching('/characters')(AccordeonSection);
const AccordeonEventsWithDataFetching = withDataFetching('/events')(AccordeonSection);
const AccordeonComicsWithDataFetching = withDataFetching('/comics')(AccordeonSection);

class SingleSeriesPage extends Component {
  componentDidMount() {
    const { location, setFetchingState, fetchSeriesData } = this.props;
    const charactersAPI = ApiFactory.createApiHandler({ pathname: location.pathname });
    const apiStr = charactersAPI.createApiString();
    setFetchingState(types.SERIES_FETCHING, true);
    fetchSeriesData(apiStr);
  }
  render() {
    const { isFetching, charactersFetching, eventsFetching, comicsFetching, location } = this.props;
    const { seriesItemData, charactersData, eventsData, comicsData } = this.props;
    const { fetchCharacterData, fetchEventsData, fetchComicsData, setFetchingState } = this.props;
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
        {!isFetching ? (
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
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

SingleSeriesPage.propTypes = {
  charactersData: PropTypes.array,
  eventsData: PropTypes.array,
  seriesItemData: PropTypes.object,
  comicsData: PropTypes.array,
  fetchCharacterData: PropTypes.func,
  fetchEventsData: PropTypes.func,
  fetchSeriesData: PropTypes.func,
  fetchComicsData: PropTypes.func,
  setFetchingState: PropTypes.func,
  isFetching: PropTypes.bool,
  charactersFetching: PropTypes.bool,
  eventsFetching: PropTypes.bool,
  comicsFetching: PropTypes.bool,
  location: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    charactersData: state.charactersData.charactersList,
    eventsData: state.eventsData.eventsList,
    seriesItemData: state.seriesData.seriesBook,
    comicsData: state.comicsData.comicsList,
    charactersFetching: state.charactersData.isFetching,
    eventsFetching: state.eventsData.isFetching,
    comicsFetching: state.comicsData.isFetching,
    isFetching: state.seriesData.isFetching,
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
    fetchSeriesData: url => {
      dispatch(fetchSingleSeries(url));
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
