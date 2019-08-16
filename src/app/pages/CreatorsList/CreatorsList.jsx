import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCreators } from '../../store/actions/creators';
import * as types from '../../store/types';
import ApiFactory from '../../utilities/apiFactory';

import CreatorsSearchCard from '../../modules/CreatorsSearchCard/CreatorsSearchCard.jsx';
import SearchComponent from '../../modules/SearchComponent/SearchComponent.jsx';
import FormGroup from '../../modules/FormGroup/FormGroup.jsx';
import Pagination from '../../modules/Pagination/Pagination.jsx';
import InputElement from '../../modules/InputElement/InputElement.jsx';
import ContentComponent from '../../modules/ContentComponent/ContentComponent.jsx';
import withLoader from '../../HOCfolder/withLoader.jsx';

const ContentComponentWithLoader = withLoader()(ContentComponent);

class CreatorsList extends Component {
  state = {
    inputValue: '',
  };
  loadData() {
    const { fetchCreatorsData, setFetchingState, location } = this.props;
    setFetchingState(true);
    const apiHandler = ApiFactory.createApiHandler({ pathname: location.pathname, search: location.search });
    const apiStr = apiHandler.createApiString();
    fetchCreatorsData(apiStr);
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
    const { fetchCreatorsData, setSearchValue, setFetchingState, location } = this.props;
    const { inputValue } = this.state;

    const startsWith = searchValue ? searchValue : inputValue;
    const apiHandler = ApiFactory.createApiHandler({ pathname: location.pathname, startsWith, offset, search: location.search });
    const apiStr = apiHandler.createApiString();

    setSearchValue(startsWith);
    setFetchingState(true);
    fetchCreatorsData(apiStr);
  };
  render() {
    const { inputValue } = this.state;
    const { creatorsData, isFetching, totalResults, searchValue, offset } = this.props;

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
        <ContentComponentWithLoader loading={isFetching} renderData={creatorsData} PartialComponent={CreatorsSearchCard} />
        {!isFetching && <Pagination searchValue={searchValue} requestData={this.requestData} totalResults={totalResults} offset={offset} />}
      </div>
    );
  }
}

CreatorsList.propTypes = {
  fetchCreatorsData: PropTypes.func,
  setSearchValue: PropTypes.func,
  setFetchingState: PropTypes.func,
  creatorsData: PropTypes.array,
  isFetching: PropTypes.bool,
  totalResults: PropTypes.number,
  offset: PropTypes.number,
  searchValue: PropTypes.string,
  location: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    creatorsData: state.creatorsData.creatorsList,
    totalResults: state.creatorsData.totalResults,
    offset: state.creatorsData.offset,
    isFetching: state.creatorsData.isFetching,
    searchValue: state.searchValue,
    router: state.router,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCreatorsData: url => {
      dispatch(fetchCreators(url));
    },
    setSearchValue: value => {
      dispatch({ type: types.SET_SEARCH_VALUE, payload: value });
    },
    setFetchingState: boolean => {
      dispatch({ type: types.CREATORS_FETCHING, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatorsList);