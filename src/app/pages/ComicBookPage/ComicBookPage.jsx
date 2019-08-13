import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchSingleComicBook } from '../../store/actions/comics';
import { fetchCharacters } from '../../store/actions/characters';
import * as types from '../../store/types';
import ApiFactory from '../../utilities/apiFactory';
import Loader from '../../modules/Loader/Loader.jsx';
import ImageAvatar from '../../modules/ImageAvatar/ImageAvatar.jsx';
import AccordeonSection from '../../modules/AccordeonSections/AccordeonSection.jsx';
import withDataFetching from '../../HOCfolder/withDataFetching.jsx';
const AccordeonEventsWithDataFetching = withDataFetching('/characters')(AccordeonSection);

class ComicBookPage extends Component {
  state = {
    firstContent: true,
    secondContent: true,
    thirdContent: true,
  };
  componentDidMount() {
    const { location, setFetchingState, fetchComicsData } = this.props;
    const charactersAPI = ApiFactory.createApiHandler({ pathname: location.pathname });
    const apiStr = charactersAPI.createApiString();
    console.log(apiStr);
    setFetchingState(true);
    fetchComicsData(apiStr);
  }
  render() {
    console.log(this.props.comicBookData);
    return <div>COMICBOOK</div>;
  }
}

ComicBookPage.propTypes = {
  charactersData: PropTypes.object,
  eventsData: PropTypes.array,
  comicBookData: PropTypes.array,
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
    charactersData: state.charactersData.charactersList,
    eventsData: state.eventsData.eventsList,
    comicBookData: state.comicsData.comicBook,
    seriesData: state.seriesData.seriesList,
    isFetching: state.charactersData.isFetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCharacterData: url => {
      dispatch(fetchCharacters(url));
    },
    fetchEventsData: url => {
      // dispatch(fetchEvents(url));
    },
    fetchComicsData: url => {
      dispatch(fetchSingleComicBook(url));
    },
    fetchSeriesData: url => {
      // dispatch(fetchSeries(url));
    },
    setFetchingState: boolean => {
      // dispatch({ type: types.CHARACTERS_FETCHING, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComicBookPage);
