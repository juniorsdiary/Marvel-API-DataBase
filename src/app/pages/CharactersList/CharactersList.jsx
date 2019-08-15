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
    const { fetchHeroes, setFetchingState, charactersList, location } = this.props;
    if (charactersList.length === 0) {
      setFetchingState(true);
      const apiHandler = ApiFactory.createApiHandler({ pathname: location.pathname });
      const apiStr = apiHandler.createApiString();
      fetchHeroes(apiStr);
    }
  }

  componentDidMount() {
    this.loadData();
  }

  setStateValue = e => {
    let inputValue = e.target.value;
    this.setState({ inputValue });
  };

  requestData = offset => {
    const { fetchHeroes, setSearchValue, setFetchingState, searchValue } = this.props;
    const { inputValue } = this.state;

    const startsWith = searchValue ? searchValue : inputValue;

    const apiHandler = ApiFactory.createApiHandler({ type: 'characters', startsWith, offset });
    const apiStr = apiHandler.createApiString();

    setSearchValue(startsWith);
    setFetchingState(true);
    fetchHeroes(apiStr);

    this.setState({ inputValue: '' });
  };

  render() {
    const { inputValue } = this.state;
    const { charactersList, isFetching, totalResults, offset } = this.props;

    return (
      <div className='page_content characters_wrapper'>
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
        <ContentComponentWithLoader
          loading={isFetching}
          className='characters_cards_wrapper'
          renderData={charactersList}
          PartialComponent={CharacterCard}
        />
        {!isFetching && <Pagination requestData={this.requestData} totalResults={totalResults} offset={offset} />}
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
