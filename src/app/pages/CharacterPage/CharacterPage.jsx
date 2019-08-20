import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as types from 'Store/types';
import { fetchSingleCharacter } from 'Store/actions/characters';
import { fetchEvents } from 'Store/actions/events';
import { fetchSeries } from 'Store/actions/series';
import { fetchComics } from 'Store/actions/comics';
import { convertToLocale } from 'Utilities/lib';
import ApiFactory from 'Utilities/apiFactory';

import Loader from 'Modules/Loader/Loader.jsx';
import ImageAvatar from 'Modules/ImageAvatar/ImageAvatar.jsx';
import AccordeonSection from 'Modules/AccordeonSections/AccordeonSection.jsx';
import DetailsSection from 'Modules/DetailsSection/DetailsSection.jsx';
import SearchCard from 'Modules/SearchCard/SearchCard.jsx';
import withDataFetching from '../../HOCfolder/withDataFetching.jsx';

const AccordeonEventsWithDataFetching = withDataFetching('/events')(AccordeonSection);
const AccordeonSeriesWithDataFetching = withDataFetching('/series')(AccordeonSection);
const AccordeonComicsWithDataFetching = withDataFetching('/comics')(AccordeonSection);

class CharacterPage extends Component {
  componentDidMount() {
    const { location, setFetchingState, fetchCharacterData } = this.props;
    const charactersAPI = ApiFactory.createApiHandler({ pathname: location.pathname });
    const apiStr = charactersAPI.createApiString();
    setFetchingState(types.CHARACTERS_FETCHING, true);
    fetchCharacterData(apiStr);
  }
  render() {
    const { location, fetchComicsData, fetchSeriesData, fetchEventsData } = this.props;
    const { characterData, comicsData, seriesData, eventsData } = this.props;
    const { isFetching, comicsFetching, seriesFetching, eventsFetching, setFetchingState } = this.props;
    const { name, description, modified, thumbnail, urls, comics, series, events } = characterData;

    const baseSrc = thumbnail.path ? `${thumbnail.path}/portrait_small.${thumbnail.extension}` : '';
    const src = thumbnail ? `${thumbnail.path}.${thumbnail.extension}` : '';

    const lastModified = convertToLocale(modified);

    let renderComics = comicsData.map(item => <SearchCard key={item.id} {...item} pathname={'/comics'} />);
    let renderSeries = seriesData.map(item => <SearchCard key={item.id} {...item} pathname={'/series'} />);
    let renderEvents = eventsData.map(item => <SearchCard key={item.id} {...item} pathname={'/events'} />);

    return (
      <div className='page_content'>
        {!isFetching ? (
          <div className='items_data_wrapper'>
            <ImageAvatar wrapper={true} className='character_page_image' baseSrc={baseSrc} src={src} />
            <DetailsSection name={name} description={description} url={urls && urls[0].url} lastModified={lastModified} />
            <AccordeonComicsWithDataFetching
              fetchingCallBack={bool => setFetchingState(types.COMICS_FETCHING, bool)}
              loading={comicsFetching}
              number={comics.available}
              location={location}
              content={renderComics}
              slider={true}
              contentClassName='default_slider_block'
              callBack={fetchComicsData}
              title={`Encountered in ${comics.available} comics`}
            />
            <AccordeonSeriesWithDataFetching
              fetchingCallBack={bool => setFetchingState(types.SERIES_FETCHING, bool)}
              loading={seriesFetching}
              number={series.available}
              location={location}
              content={renderSeries}
              slider={true}
              contentClassName='default_slider_block'
              callBack={fetchSeriesData}
              title={`Encountered in ${series.available} series`}
            />
            <AccordeonEventsWithDataFetching
              fetchingCallBack={bool => setFetchingState(types.EVENTS_FETCHING, bool)}
              loading={eventsFetching}
              number={events.available}
              location={location}
              content={renderEvents}
              slider={true}
              contentClassName='default_slider_block'
              callBack={fetchEventsData}
              title={`Encountered in ${events.available} events`}
            />
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

CharacterPage.propTypes = {
  characterData: PropTypes.object,
  eventsData: PropTypes.array,
  comicsData: PropTypes.array,
  seriesData: PropTypes.array,
  fetchCharacterData: PropTypes.func,
  fetchEventsData: PropTypes.func,
  fetchComicsData: PropTypes.func,
  fetchSeriesData: PropTypes.func,
  setFetchingState: PropTypes.func,
  isFetching: PropTypes.bool,
  comicsFetching: PropTypes.bool,
  seriesFetching: PropTypes.bool,
  eventsFetching: PropTypes.bool,
  location: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    characterData: state.charactersData.singleCharacter,
    eventsData: state.eventsData.eventsList,
    comicsData: state.comicsData.comicsList,
    seriesData: state.seriesData.seriesList,
    comicsFetching: state.comicsData.isFetching,
    seriesFetching: state.seriesData.isFetching,
    eventsFetching: state.eventsData.isFetching,
    isFetching: state.charactersData.isFetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCharacterData: url => {
      dispatch(fetchSingleCharacter(url));
    },
    fetchEventsData: url => {
      dispatch(fetchEvents(url));
    },
    fetchComicsData: url => {
      dispatch(fetchComics(url));
    },
    fetchSeriesData: url => {
      dispatch(fetchSeries(url));
    },
    setFetchingState: (type, boolean) => {
      dispatch({ type: type, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterPage);
