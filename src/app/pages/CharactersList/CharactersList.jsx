import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCharacters } from '../../store/actions/characters';
import * as types from '../../store/types';
import ApiFactory from '../../utilities/apiFactory';

import CharacterCard from '../../modules/CharacterCard/CharacterCard.jsx';
import SearchComponent from '../../modules/SearchComponent/SearchComponent.jsx';
import FormGroup from '../../modules/FormGroup/FormGroup.jsx';
import Pagination from '../../modules/Pagination/Pagination.jsx';
import InputElement from '../../modules/InputElement/InputElement.jsx';
import ContentComponent from '../../modules/ContentComponent/ContentComponent.jsx';
import withLoader from '../../HOCfolder/withLoader.jsx';
const ContentComponentWithLoader = withLoader()(ContentComponent);

class CharachtersList extends Component {
  state = {
    inputValue: '',
  };

  loadData() {
    const { fetchHeroes, setFetchingState, location } = this.props;
    setFetchingState(true);
    const apiHandler = ApiFactory.createApiHandler({ pathname: location.pathname, search: location.search });
    const apiStr = apiHandler.createApiString();
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

  requestData = (searchValue, offset) => {
    const { fetchHeroes, setSearchValue, setFetchingState, location } = this.props;
    const { inputValue } = this.state;

    const startsWith = searchValue ? searchValue : inputValue;
    const apiHandler = ApiFactory.createApiHandler({ pathname: location.pathname, startsWith, offset, search: location.search });
    const apiStr = apiHandler.createApiString();
    setSearchValue(startsWith);
    setFetchingState(true);
    fetchHeroes(apiStr);
  };

  render() {
    const { inputValue } = this.state;
    const { charactersList, isFetching, totalResults, offset, searchValue } = this.props;

    return (
      <div className='page_content default_page_content'>
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
        <ContentComponentWithLoader loading={isFetching} renderData={charactersList} PartialComponent={CharacterCard} />
        {!isFetching && <Pagination searchValue={searchValue} requestData={this.requestData} totalResults={totalResults} offset={offset} />}
      </div>
    );
  }
}

CharachtersList.propTypes = {
  fetchHeroes: PropTypes.func,
  setSearchValue: PropTypes.func,
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
    setSearchValue: value => {
      dispatch({ type: types.SET_SEARCH_VALUE, payload: value });
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
