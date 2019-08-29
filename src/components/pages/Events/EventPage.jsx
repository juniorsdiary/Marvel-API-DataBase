import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchSeries, fetchCharacters, fetchComics, types, fetchSingleEvent } from 'Store';
import { convertToLocale, ApiFactory } from 'Utilities';
import {
  ErrorHandler,
  CreatorsComponent,
  Loader,
  ImageAvatar,
  AccordeonSection,
  DetailsSection,
  SearchCard,
  PreviewItem,
  CharacterCard,
} from 'Modules';
import { withDataFetching } from 'Components/hocs';

const CharactersAccordeon = withDataFetching('/characters')(AccordeonSection);
const ComicsAccordeon = withDataFetching('/comics')(AccordeonSection);
const SeriesAccordeon = withDataFetching('/series')(AccordeonSection);
class EventPage extends Component {
  componentDidMount() {
    const { storeData } = this.props;
    if (!storeData) {
      this.loadPrimaryData();
    }
  }
  loadPrimaryData = () => {
    const { fetchEventData, location, setFetchingState } = this.props;
    const charactersAPI = ApiFactory.createApiHandler({ pathname: location.pathname });
    const apiStr = charactersAPI.createApiString();
    setFetchingState(types.EVENTS_FETCHING, true);
    fetchEventData(apiStr);
  };
  render() {
    const { location, setFetchingState } = this.props;
    const { fetchStatus, charactersFetchStatus, comicsFetchStatus, seriesFetchStatus } = this.props;
    const { fetchedData, storeData, charactersData, comicsData, seriesData } = this.props;
    const { fetchCharacterData, fetchComicsData, fetchSeriesData } = this.props;
    const { title, description, modified, thumbnail, urls, comics, creators, characters, series } = storeData || fetchedData;
    const { isFetching, status, message } = fetchStatus;
    const baseSrc = thumbnail.path ? `${thumbnail.path}/portrait_small.${thumbnail.extension}` : '';
    const src = thumbnail.path ? `${thumbnail.path}.${thumbnail.extension}` : '';
    const lastModified = convertToLocale(modified);
    // console.log(eventItemData);
    // console.log(eventItemData.next);
    // console.log(eventItemData.previous);
    const renderCharacters = charactersData.map(item => <CharacterCard key={item.id} {...item} pathname={'/characters'} />);
    const renderCreators = creators.items.map((item, index) => <PreviewItem key={index} {...item} />);
    const renderComics = comicsData.map(item => <SearchCard key={item.id} {...item} pathname={'/comics'} />);
    const renderSeries = seriesData.map(item => <SearchCard key={item.id} {...item} pathname={'/series'} />);

    return (
      <div className='page_content'>
        {isFetching ? (
          <Loader />
        ) : !status ? (
          <ErrorHandler msg={message} size={'35'} loadData={() => this.loadPrimaryData()} />
        ) : (
          <div className='items_data_wrapper'>
            <ImageAvatar wrapper={true} className='cover_book_image' baseSrc={baseSrc} src={src} />
            <DetailsSection name={title} description={description} url={urls && urls[0].url} lastModified={lastModified} />
            <CharactersAccordeon
              fetchingCallBack={bool => setFetchingState(types.CHARACTERS_FETCHING, bool)}
              fetchStatus={charactersFetchStatus}
              number={characters.available}
              location={location}
              content={renderCharacters}
              slider={true}
              contentClassName='default_slider_block'
              callBack={fetchCharacterData}
              title={`You can meet ${characters.available} characters`}
            />
            <ComicsAccordeon
              fetchingCallBack={bool => setFetchingState(types.COMICS_FETCHING, bool)}
              fetchStatus={comicsFetchStatus}
              number={comics.available}
              location={location}
              content={renderComics}
              slider={true}
              contentClassName='default_slider_block'
              callBack={fetchComicsData}
              title={`Contains ${comics.available} comics`}
            />
            <SeriesAccordeon
              fetchingCallBack={bool => setFetchingState(types.SERIES_FETCHING, bool)}
              fetchStatus={seriesFetchStatus}
              number={series.available}
              location={location}
              content={renderSeries}
              slider={true}
              contentClassName='default_slider_block'
              callBack={fetchSeriesData}
              title={`Contains ${series.available} series`}
            />
            <CreatorsComponent content={renderCreators} number={creators.available} location={location} pathname={'/creators'} />
          </div>
        )}
      </div>
    );
  }
}

EventPage.propTypes = {
  storeData: PropTypes.object,
  fetchedData: PropTypes.object,
  fetchStatus: PropTypes.object,
  fetchEventData: PropTypes.func,
  charactersData: PropTypes.array,
  fetchCharacterData: PropTypes.func,
  charactersFetchStatus: PropTypes.object,
  seriesData: PropTypes.array,
  fetchSeriesData: PropTypes.func,
  seriesFetchStatus: PropTypes.object,
  comicsData: PropTypes.array,
  fetchComicsData: PropTypes.func,
  comicsFetchStatus: PropTypes.object,
  setFetchingState: PropTypes.func,
  location: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id);
  return {
    storeData: state.eventsData.eventsList.filter(item => item.id === id)[0],
    fetchedData: state.eventsData.eventItem,
    fetchStatus: state.eventsData.fetchStatus,
    charactersData: state.charactersData.charactersList,
    charactersFetchStatus: state.charactersData.fetchStatus,
    seriesData: state.seriesData.seriesList,
    seriesFetchStatus: state.seriesData.fetchStatus,
    comicsData: state.comicsData.comicsList,
    comicsFetchStatus: state.comicsData.fetchStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCharacterData: url => {
      dispatch(fetchCharacters(url));
    },
    fetchComicsData: url => {
      dispatch(fetchComics(url));
    },
    fetchSeriesData: url => {
      dispatch(fetchSeries(url));
    },
    fetchEventData: url => {
      dispatch(fetchSingleEvent(url));
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
