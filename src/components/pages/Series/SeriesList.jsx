import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchSeries, types } from 'Store';
import { ApiFactory } from 'Utilities';
import { SearchCard, SearchComponent, FormGroup, Pagination, InputElement, ContentComponent } from 'Modules';

import { withLoader } from 'Components/hocs.jsx';

const ContentComponentWithLoader = withLoader()(ContentComponent);

class SeriesList extends Component {
  state = {
    inputValue: '',
  };
  loadData() {
    const { fetchSeriesData, setFetchingState, location } = this.props;
    setFetchingState(true);
    const apiHandler = ApiFactory.createApiHandler({ pathname: location.pathname, search: location.search });
    const apiStr = apiHandler.createApiString();
    fetchSeriesData(apiStr);
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
    const { fetchSeriesData, setSearchValue, setFetchingState, location } = this.props;
    const { inputValue } = this.state;

    const startsWith = searchValue ? searchValue : inputValue;
    const apiHandler = ApiFactory.createApiHandler({ pathname: location.pathname, startsWith, offset, search: location.search });
    const apiStr = apiHandler.createApiString();

    setSearchValue(startsWith);
    setFetchingState(true);
    fetchSeriesData(apiStr);
  };
  render() {
    const { inputValue } = this.state;
    const { seriesData, isFetching, totalResults, searchValue, offset, location } = this.props;

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
        <ContentComponentWithLoader loading={isFetching} renderData={seriesData} PartialComponent={SearchCard} pathname={location.pathname} />
        {!isFetching && <Pagination searchValue={searchValue} requestData={this.requestData} totalResults={totalResults} offset={offset} />}
      </div>
    );
  }
}

SeriesList.propTypes = {
  fetchSeriesData: PropTypes.func,
  setSearchValue: PropTypes.func,
  setFetchingState: PropTypes.func,
  seriesData: PropTypes.array,
  isFetching: PropTypes.bool,
  totalResults: PropTypes.number,
  offset: PropTypes.number,
  searchValue: PropTypes.string,
  match: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    seriesData: state.seriesData.seriesList,
    totalResults: state.seriesData.totalResults,
    offset: state.seriesData.offset,
    isFetching: state.seriesData.isFetching,
    searchValue: state.searchValue,
    router: state.router,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSeriesData: url => {
      dispatch(fetchSeries(url));
    },
    setSearchValue: value => {
      dispatch({ type: types.SET_SEARCH_VALUE, payload: value });
    },
    setFetchingState: boolean => {
      dispatch({ type: types.SERIES_FETCHING, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeriesList);
