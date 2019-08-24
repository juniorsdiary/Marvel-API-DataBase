import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchSeries, fetchCharacters, fetchSingleEvent, fetchComics, types } from 'Store';
import { convertToLocale, ApiFactory } from 'Utilities';
import { Loader, ImageAvatar, AccordeonSection, DetailsSection, SearchCard, PreviewItem, CharacterCard } from 'Modules';

import { withDataFetching } from 'Components/hocs.jsx';

const AccordeonCharactersWithDataFetching = withDataFetching('/characters')(AccordeonSection);
const AccordeonComicsWithDataFetching = withDataFetching('/comics')(AccordeonSection);
const AccordeonSeriesWithDataFetching = withDataFetching('/series')(AccordeonSection);

class EventPage extends Component {
  componentDidMount() {
    const { location, setFetchingState, fetchEventsData } = this.props;
    const charactersAPI = ApiFactory.createApiHandler({ pathname: location.pathname });
    const apiStr = charactersAPI.createApiString();
    setFetchingState(types.EVENTS_FETCHING, true);
    fetchEventsData(apiStr);
  }
  render() {
    const { isFetching, charactersFetching, comicsFetching, seriesFetching, location } = this.props;
    const { eventItemData, charactersData, comicsData, seriesData } = this.props;
    const { fetchCharacterData, fetchComicsData, fetchSeriesData, setFetchingState } = this.props;
    const { title, description, modified, thumbnail, urls, comics, creators, characters, series } = eventItemData;

    const baseSrc = thumbnail ? `${thumbnail.path}/portrait_small.${thumbnail.extension}` : '';
    const src = thumbnail ? `${thumbnail.path}.${thumbnail.extension}` : '';

    const lastModified = convertToLocale(modified);
    // console.log(eventItemData);
    // console.log(eventItemData.next);
    // console.log(eventItemData.previous);
    const renderCharacters = charactersData.map(item => <CharacterCard key={item.id} {...item} />);
    const renderCreators = creators.items.map((item, index) => <PreviewItem key={index} {...item} />);
    const renderComics = comicsData.map(item => <SearchCard key={item.id} {...item} pathname={'/comics'} />);
    const renderSeries = seriesData.map(item => <SearchCard key={item.id} {...item} pathname={'/series'} />);
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
            <AccordeonSeriesWithDataFetching
              fetchingCallBack={bool => setFetchingState(types.SERIES_FETCHING, bool)}
              loading={seriesFetching}
              number={series.available}
              location={location}
              content={renderSeries}
              slider={true}
              contentClassName='default_slider_block'
              callBack={fetchSeriesData}
              title={`Contains ${series.available} series`}
            />
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

EventPage.propTypes = {
  charactersData: PropTypes.array,
  eventItemData: PropTypes.object,
  seriesData: PropTypes.array,
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
  seriesFetching: PropTypes.bool,
  location: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    charactersData: state.charactersData.charactersList,
    eventItemData: state.eventsData.eventItem,
    seriesData: state.seriesData.seriesList,
    comicsData: state.comicsData.comicsList,
    charactersFetching: state.charactersData.isFetching,
    eventsFetching: state.eventsData.isFetching,
    comicsFetching: state.comicsData.isFetching,
    isFetching: state.eventsData.isFetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCharacterData: url => {
      dispatch(fetchCharacters(url));
    },
    fetchEventsData: url => {
      dispatch(fetchSingleEvent(url));
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
)(EventPage);
