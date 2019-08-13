import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchComics } from '../../store/actions/comics';
import * as types from '../../store/types';
import ApiFactory from '../../utilities/apiFactory';

import ComicBookSearchCard from '../../modules/ComicBookSearchCard/ComicBookSearchCard.jsx';
import SearchComponent from '../../modules/SearchComponent/SearchComponent.jsx';
import FormGroup from '../../modules/FormGroup/FormGroup.jsx';
import Pagination from '../../modules/Pagination/Pagination.jsx';
import InputElement from '../../modules/InputElement/InputElement.jsx';
import ContentComponent from '../../modules/ContentComponent/ContentComponent.jsx';
import withLoader from '../../HOCfolder/withLoader.jsx';

class ComicsList extends Component {
  state = {
    inputValue: '',
  };
  loadData() {
    const { fetchComicsData, setFetchingState, location } = this.props;
    setFetchingState(true);
    const apiHandler = ApiFactory.createApiHandler({ type: 'comics', search: location.search });
    const apiStr = apiHandler.createApiString();
    fetchComicsData(apiStr);
  }
  componentDidMount() {
    const { comicBooksData, location } = this.props;
    if (comicBooksData.length === 0 || location.search) this.loadData();
  }

  setStateValue = e => {
    let inputValue = e.target.value;
    this.setState({ inputValue });
  };

  requestData = offset => {
    const { fetchComicsData, setSearchValue, setFetchingState, searchValue, location } = this.props;
    const { inputValue } = this.state;

    const startsWith = searchValue ? searchValue : inputValue;

    const apiHandler = ApiFactory.createApiHandler({ type: location.path, startsWith, offset, search: location.search });
    const apiStr = apiHandler.createApiString();

    setSearchValue(startsWith);
    setFetchingState(true);
    fetchComicsData(apiStr);

    this.setState({ inputValue: '' });
  };
  render() {
    const { inputValue } = this.state;
    const { comicBooksData, isFetching, totalResults, offset } = this.props;
    const ContentComponentWithLoader = withLoader(isFetching)(ContentComponent);

    return (
      <div className='page_content comics_wrapper'>
        <SearchComponent>
          <FormGroup requestData={this.requestData}>
            <InputElement
              id='startsWith'
              className='parametrs_list__startsWith_input'
              type='text'
              label='title starts with'
              onChange={this.setStateValue}
              value={inputValue}
            />
          </FormGroup>
        </SearchComponent>
        <ContentComponentWithLoader className='comics_cards_wrapper' renderData={comicBooksData} PartialComponent={ComicBookSearchCard} />
        {!isFetching && <Pagination requestData={this.requestData} totalResults={totalResults} offset={offset} />}
      </div>
    );
  }
}

ComicsList.propTypes = {
  fetchComicsData: PropTypes.func,
  setSearchValue: PropTypes.func,
  setFetchingState: PropTypes.func,
  comicBooksData: PropTypes.array,
  isFetching: PropTypes.bool,
  totalResults: PropTypes.number,
  offset: PropTypes.number,
  searchValue: PropTypes.string,
  match: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    comicBooksData: state.comicsData.comicsList,
    totalResults: state.comicsData.totalResults,
    offset: state.comicsData.offset,
    isFetching: state.comicsData.isFetching,
    searchValue: state.searchValue,
    router: state.router,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchComicsData: url => {
      dispatch(fetchComics(url));
    },
    setSearchValue: value => {
      dispatch({ type: types.SET_SEARCH_VALUE, payload: value });
    },
    setFetchingState: boolean => {
      dispatch({ type: types.COMICS_FETCHING, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComicsList);
