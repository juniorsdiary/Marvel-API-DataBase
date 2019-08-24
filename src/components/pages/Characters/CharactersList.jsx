import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchCharacters, types } from 'Store';
import { ApiFactory } from 'Utilities';
import { CharacterCard, SearchComponent, Pagination, ContentComponent } from 'Modules';
import { withLoader } from 'Components/hocs.jsx';

import { FormGroup } from '@material-ui/core';
import { Input } from '@material-ui/core';

const ContentComponentWithLoader = withLoader()(ContentComponent);

class CharachtersList extends Component {
  state = {
    inputValue: '',
    order: '',
  };

  loadData() {
    const { fetchHeroes, setFetchingState, location, setFilters } = this.props;
    setFetchingState(true);
    const apiHandler = ApiFactory.createApiHandler({ pathname: location.pathname, search: location.search });
    const apiStr = apiHandler.createApiString();
    this.setState({ order: 'name' });
    setFilters({ startsWith: '', order: 'name' });
    fetchHeroes(apiStr);
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

  setOrderValue = e => {
    let order = e.target.value;
    this.setState({ order });
  };

  requestData = (searchValue, offset) => {
    const { fetchHeroes, setFilters, setFetchingState, location } = this.props;
    const { inputValue, order } = this.state;

    const startsWith = searchValue ? searchValue : inputValue;
    const apiHandler = ApiFactory.createApiHandler({ pathname: location.pathname, search: location.search, startsWith, offset, order });
    const apiStr = apiHandler.createApiString();
    setFilters({ startsWith, order });
    setFetchingState(true);
    fetchHeroes(apiStr);
  };

  render() {
    const { inputValue } = this.state;
    const { charactersList, isFetching, totalResults, offset, searchValue } = this.props;

    return (
      <div className='page_content'>
        <SearchComponent>
          <FormGroup className='characters_filter_form'>
            <Input
              id='startsWith'
              name='startsWith'
              className='startsWith_input'
              onChange={this.setStateValue}
              value={inputValue}
              autoComplete={'false'}
            />
          </FormGroup>
        </SearchComponent>
        {!isFetching && <Pagination searchValue={searchValue} requestData={this.requestData} totalResults={totalResults} offset={offset} />}
        <ContentComponentWithLoader loading={isFetching} renderData={charactersList} PartialComponent={CharacterCard} />
      </div>
    );
  }
}

CharachtersList.propTypes = {
  fetchHeroes: PropTypes.func,
  setFilters: PropTypes.func,
  setFetchingState: PropTypes.func,
  charactersList: PropTypes.array,
  isFetching: PropTypes.bool,
  totalResults: PropTypes.number,
  offset: PropTypes.number,
  searchValue: PropTypes.string,
  location: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    charactersList: state.charactersData.charactersList,
    totalResults: state.charactersData.totalResults,
    offset: state.charactersData.offset,
    isFetching: state.charactersData.isFetching,
    searchValue: state.searchValue,
    router: state.router,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchHeroes: url => {
      dispatch(fetchCharacters(url));
    },
    setFilters: params => {
      dispatch({ type: types.SET_FILTERS, payload: params });
    },
    setFetchingState: boolean => {
      dispatch({ type: types.CHARACTERS_FETCHING, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharachtersList);
