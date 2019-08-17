import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchSingleCharacter } from '../../store/actions/characters';
import { fetchEvents } from '../../store/actions/events';
import { fetchSeries } from '../../store/actions/series';
import { fetchComics } from '../../store/actions/comics';
import * as types from '../../store/types';
import { convertToLocale } from '../../utilities/lib';
import ApiFactory from '../../utilities/apiFactory';

import Loader from '../../modules/Loader/Loader.jsx';
import ImageAvatar from '../../modules/ImageAvatar/ImageAvatar.jsx';
import AccordeonSection from '../../modules/AccordeonSections/AccordeonSection.jsx';
import DetailsSection from '../../modules/DetailsSection/DetailsSection.jsx';
import ComicBookPreview from '../../modules/ComicBookPreview/ComicBookPreview.jsx';
import withDataFetching from '../../HOCfolder/withDataFetching.jsx';

const AccordeonEventsWithDataFetching = withDataFetching('/events')(AccordeonSection);
const AccordeonSeriesWithDataFetching = withDataFetching('/series')(AccordeonSection);
const AccordeonComicsWithDataFetching = withDataFetching('/comics')(AccordeonSection);

class CharacterPage extends Component {
  state = {
    firstContent: true,
    secondContent: true,
    thirdContent: true,
  };
  componentDidMount() {
    const { location, setFetchingState, fetchCharacterData } = this.props;
    const charactersAPI = ApiFactory.createApiHandler({ pathname: location.pathname });
    const apiStr = charactersAPI.createApiString();
    setFetchingState(true);
    fetchCharacterData(apiStr);
  }
  handleChange = name => {
    this.setState(prevState => ({ [name]: !prevState[name] }));
  };
  render() {
    const { isFetching, location, fetchComicsData, fetchSeriesData, fetchEventsData } = this.props;
    const { characterData, comicsData, seriesData, eventsData } = this.props;
    const { firstContent, secondContent, thirdContent } = this.state;
    const { name, description, modified, thumbnail, urls, comics, series, events } = characterData;

    const baseSrc = thumbnail.path ? `${thumbnail.path}/portrait_small.${thumbnail.extension}` : '';
    const src = thumbnail ? `${thumbnail.path}.${thumbnail.extension}` : '';

    const lastModified = convertToLocale(modified);
    let renderComics = comicsData.map(item => <ComicBookPreview key={item.id} {...item} />);
    let renderSeries = seriesData.map(item => <ComicBookPreview key={item.id} {...item} />);
    let renderEvents = eventsData.map(item => <ComicBookPreview key={item.id} {...item} />);
    return (
      <div className='page_content default_page_content'>
        {!isFetching ? (
          <div className='items_data_wrapper'>
            <ImageAvatar className='character_image_wrapper' baseSrc={baseSrc} src={src} />
            <DetailsSection name={name} description={description} url={urls && urls[0].url} lastModified={lastModified} />
            <AccordeonComicsWithDataFetching
              number={comics.available}
              state={firstContent}
              location={location}
              content={renderComics}
              slider={true}
              contentClassName='default_slider_block'
              callBack={url => fetchComicsData(url)}>
              <h1 className='available_items_title' onClick={() => this.handleChange('firstContent')}>
                Encountered in {comics.available} comics
              </h1>
            </AccordeonComicsWithDataFetching>
            <AccordeonSeriesWithDataFetching
              number={series.available}
              state={secondContent}
              location={location}
              content={renderSeries}
              slider={true}
              contentClassName='default_slider_block'
              callBack={fetchSeriesData}>
              <h1 className='available_items_title' onClick={() => this.handleChange('secondContent')}>
                Encountered in {series.available} series
              </h1>
            </AccordeonSeriesWithDataFetching>
            <AccordeonEventsWithDataFetching
              number={events.available}
              state={thirdContent}
              location={location}
              content={renderEvents}
              slider={true}
              contentClassName='default_slider_block'
              callBack={fetchEventsData}>
              <h1 className='available_items_title' onClick={() => this.handleChange('thirdContent')}>
                Encountered in {events.available} events
              </h1>
            </AccordeonEventsWithDataFetching>
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
  location: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    characterData: state.charactersData.singleCharacter,
    eventsData: state.eventsData.eventsList,
    comicsData: state.comicsData.comicsList,
    seriesData: state.seriesData.seriesList,
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
    setFetchingState: boolean => {
      dispatch({ type: types.CHARACTERS_FETCHING, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterPage);
