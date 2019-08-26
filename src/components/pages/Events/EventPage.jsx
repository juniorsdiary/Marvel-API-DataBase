import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchSeries, fetchCharacters, fetchComics, types } from 'Store';
import { convertToLocale } from 'Utilities';
import { ImageAvatar, AccordeonSection, DetailsSection, SearchCard, PreviewItem, CharacterCard } from 'Modules';
import { withDataFetching } from 'Components/hocs';

const AccordeonCharactersWithDataFetching = withDataFetching('/characters')(AccordeonSection);
const AccordeonComicsWithDataFetching = withDataFetching('/comics')(AccordeonSection);
const AccordeonSeriesWithDataFetching = withDataFetching('/series')(AccordeonSection);

const EventPage = () => {
  const { charactersFetching, comicsFetching, seriesFetching, location } = this.props;
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
    </div>
  );
};

EventPage.propTypes = {
  charactersData: PropTypes.array,
  eventItemData: PropTypes.object,
  seriesData: PropTypes.array,
  comicsData: PropTypes.array,
  fetchCharacterData: PropTypes.func,
  fetchSeriesData: PropTypes.func,
  fetchComicsData: PropTypes.func,
  setFetchingState: PropTypes.func,
  charactersFetching: PropTypes.bool,
  comicsFetching: PropTypes.bool,
  seriesFetching: PropTypes.bool,
  location: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id);
  return {
    charactersData: state.charactersData.charactersList,
    eventItemData: state.eventsData.eventsList.filter(item => item.id === id)[0],
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
    setFetchingState: (type, boolean) => {
      dispatch({ type: type, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPage);
