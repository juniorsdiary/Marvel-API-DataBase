import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchComics } from 'Store/actions/comics';
import * as types from 'Store/types';
import ApiFactory from 'Utilities/apiFactory';

import SearchCard from 'Modules/SearchCard/SearchCard.jsx';
import SearchComponent from 'Modules/SearchComponent/SearchComponent.jsx';
import FormGroup from 'Modules/FormGroup/FormGroup.jsx';
import Pagination from 'Modules/Pagination/Pagination.jsx';
import InputElement from 'Modules/InputElement/InputElement.jsx';
import ContentComponent from 'Modules/ContentComponent/ContentComponent.jsx';
import { withLoader } from 'Utilities/hocs.jsx';

const ContentComponentWithLoader = withLoader()(ContentComponent);

class ComicsList extends Component {
  state = {
    inputValue: '',
  };
  loadData() {
    const { fetchComicsData, setFetchingState, location } = this.props;
    setFetchingState(true);
    const apiHandler = ApiFactory.createApiHandler({ pathname: location.pathname, search: location.search });
    const apiStr = apiHandler.createApiString();
    fetchComicsData(apiStr);
  }
  componentDidMount() {
    const { location } = this.props;
    const apiCheck = ApiFactory.apiHash.filter(item => item.pathname === location.pathname).length;
    const lastApicall = ApiFactory.apiHash.filter(item => item.pathname === location.pathname).slice(-1)[0];
    if (!apiCheck) {
      this.loadData();
    } else {
      if (lastApicall.search) {
        this.loadData();
      }
    }
  }

  setStateValue = e => {
    let inputValue = e.target.value;
    this.setState({ inputValue });
  };

  requestData = (searchValue, offset) => {
    const { fetchComicsData, setSearchValue, setFetchingState, location } = this.props;
    const { inputValue } = this.state;

    const startsWith = searchValue ? searchValue : inputValue;
    const apiHandler = ApiFactory.createApiHandler({ pathname: location.pathname, startsWith, offset, search: location.search });
    const apiStr = apiHandler.createApiString();

    setSearchValue(startsWith);
    setFetchingState(true);
    fetchComicsData(apiStr);
  };
  render() {
    const { inputValue } = this.state;
    const { comicBooksData, isFetching, totalResults, searchValue, offset, location } = this.props;

    return (
      <div className='page_content'>
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
        <ContentComponentWithLoader loading={isFetching} renderData={comicBooksData} PartialComponent={SearchCard} pathname={location.pathname} />
        {!isFetching && <Pagination searchValue={searchValue} requestData={this.requestData} totalResults={totalResults} offset={offset} />}
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
