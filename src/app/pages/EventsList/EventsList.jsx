import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchEvents } from 'Store/actions/events';
import * as types from 'Store/types';
import ApiFactory from 'Utilities/apiFactory';

import SearchCard from 'Modules/SearchCard/SearchCard.jsx';
import SearchComponent from 'Modules/SearchComponent/SearchComponent.jsx';
import FormGroup from 'Modules/FormGroup/FormGroup.jsx';
import Pagination from 'Modules/Pagination/Pagination.jsx';
import InputElement from 'Modules/InputElement/InputElement.jsx';
import ContentComponent from 'Modules/ContentComponent/ContentComponent.jsx';
import withLoader from '../../HOCfolder/withLoader.jsx';
const ContentComponentWithLoader = withLoader()(ContentComponent);

class EventsList extends Component {
  state = {
    inputValue: '',
  };

  loadData() {
    const { fetchEventsData, setFetchingState, location } = this.props;
    setFetchingState(true);
    const apiHandler = ApiFactory.createApiHandler({ pathname: location.pathname, search: location.search });
    const apiStr = apiHandler.createApiString();
    fetchEventsData(apiStr);
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
    const { fetchEventsData, setSearchValue, setFetchingState, location } = this.props;
    const { inputValue } = this.state;

    const startsWith = searchValue ? searchValue : inputValue;

    const apiHandler = ApiFactory.createApiHandler({ pathname: location.pathname, startsWith, offset, search: location.search });
    const apiStr = apiHandler.createApiString();

    setSearchValue(startsWith);
    setFetchingState(true);
    fetchEventsData(apiStr);
  };

  render() {
    const { inputValue } = this.state;
    const { eventsList, isFetching, totalResults, searchValue, offset, location } = this.props;
    return (
      <div className='page_content'>
        <SearchComponent>
          <FormGroup requestData={this.requestData}>
            <InputElement
              id='startsWith'
              className='parametrs_list__startsWith_input'
              type='text'
              label='name starts with'
              onChange={this.setStateValue}
              value={inputValue}
            />
          </FormGroup>
        </SearchComponent>
        <ContentComponentWithLoader loading={isFetching} renderData={eventsList} PartialComponent={SearchCard} pathname={location.pathname} />
        {!isFetching && <Pagination searchValue={searchValue} requestData={this.requestData} totalResults={totalResults} offset={offset} />}
      </div>
    );
  }
}

EventsList.propTypes = {
  fetchEventsData: PropTypes.func,
  setSearchValue: PropTypes.func,
  setFetchingState: PropTypes.func,
  eventsList: PropTypes.array,
  isFetching: PropTypes.bool,
  totalResults: PropTypes.number,
  offset: PropTypes.number,
  searchValue: PropTypes.string,
  location: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    eventsList: state.eventsData.eventsList,
    totalResults: state.eventsData.totalResults,
    offset: state.eventsData.offset,
    isFetching: state.eventsData.isFetching,
    searchValue: state.searchValue,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEventsData: url => {
      dispatch(fetchEvents(url));
    },
    setSearchValue: value => {
      dispatch({ type: types.SET_SEARCH_VALUE, payload: value });
    },
    setFetchingState: boolean => {
      dispatch({ type: types.EVENTS_FETCHING, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsList);
