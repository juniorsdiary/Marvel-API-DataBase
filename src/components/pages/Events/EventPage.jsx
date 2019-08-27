import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchSeries, fetchCharacters, fetchComics, types, fetchSingleEvent } from 'Store';
import { convertToLocale, ApiFactory } from 'Utilities';
import { Loader, ImageAvatar, AccordeonSection, DetailsSection, SearchCard, PreviewItem, CharacterCard } from 'Modules';
import { withDataFetching } from 'Components/hocs';

const AccordeonCharactersWithDataFetching = withDataFetching('/characters')(AccordeonSection);
const AccordeonComicsWithDataFetching = withDataFetching('/comics')(AccordeonSection);
const AccordeonSeriesWithDataFetching = withDataFetching('/series')(AccordeonSection);

const EventPage = props => {
  const { isFetching, charactersFetching, comicsFetching, seriesFetching, location } = props;
  const { fetchedData, storeData, charactersData, comicsData, seriesData } = props;
  const { fetchEventData, fetchCharacterData, fetchComicsData, fetchSeriesData, setFetchingState } = props;
  const { title, description, modified, thumbnail, urls, comics, creators, characters, series } = storeData || fetchedData;

  useEffect(() => {
    const charactersAPI = ApiFactory.createApiHandler({ pathname: location.pathname });
    const apiStr = charactersAPI.createApiString();
    if (!storeData) {
      setFetchingState(types.EVENTS_FETCHING, true);
      fetchEventData(apiStr);
    }
  }, [fetchEventData, location, setFetchingState, storeData]);

  const baseSrc = thumbnail.path ? `${thumbnail.path}/portrait_small.${thumbnail.extension}` : '';
  const src = thumbnail.path ? `${thumbnail.path}.${thumbnail.extension}` : '';

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
      )}
    </div>
  );
};

EventPage.propTypes = {
  storeData: PropTypes.object,
  fetchedData: PropTypes.object,
  charactersData: PropTypes.array,
  seriesData: PropTypes.array,
  comicsData: PropTypes.array,
  fetchCharacterData: PropTypes.func,
  fetchSeriesData: PropTypes.func,
  fetchComicsData: PropTypes.func,
  fetchEventData: PropTypes.func,
  setFetchingState: PropTypes.func,
  charactersFetching: PropTypes.bool,
  comicsFetching: PropTypes.bool,
  seriesFetching: PropTypes.bool,
  isFetching: PropTypes.bool,
  location: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id);
  return {
    storeData: state.eventsData.eventsList.filter(item => item.id === id)[0],
    fetchedData: state.eventsData.eventItem,
    charactersData: state.charactersData.charactersList,
    isFetching: state.eventsData.isFetching,
    seriesData: state.seriesData.seriesList,
    comicsData: state.comicsData.comicsList,
    charactersFetching: state.charactersData.isFetching,
    seriesFetching: state.seriesData.isFetching,
    comicsFetching: state.comicsData.isFetching,
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
