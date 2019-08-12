import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCharacters } from '../../store/actions';
import * as types from '../../store/types';
import ApiFactory from '../../utilities/apiFactory';

import CharacterCard from '../../modules/CharacterCard/CharacterCard.jsx';
import SearchComponent from '../../modules/SearchComponent/SearchComponent.jsx';
import FormGroup from '../../modules/FormGroup/FormGroup.jsx';
import Pagination from '../../modules/Pagination/Pagination.jsx';
import Loader from '../../modules/Loader/Loader.jsx';
import InputElement from '../../modules/InputElement/InputElement.jsx';

class CharachtersList extends Component {
  state = {
    startsWith: '',
  };

  componentDidMount() {
    const { fetchHeroes, setFetchingState, charactersList } = this.props;
    if (charactersList.length === 0) {
      setFetchingState(true);
      const apiHandler = ApiFactory.createApiHandler({ type: 'characters' });
      const apiStr = apiHandler.createApiString();
      fetchHeroes(apiStr);
    }
  }

  setStateValue = e => {
    let startsWith = e.target.value;
    this.setState({ startsWith });
  };

  requestData = offset => {
    const { fetchHeroes, setSearchValue, setFetchingState } = this.props;
    const { startsWith } = this.state;

    const apiHandler = ApiFactory.createApiHandler({ type: 'characters', startsWith, offset });
    const apiStr = apiHandler.createApiString();

    setSearchValue(startsWith);
    setFetchingState(true);
    fetchHeroes(apiStr);

    this.setState({ startsWith: '' });
  };

  render() {
    const { startsWith } = this.state;
    const { charactersList, isFetching } = this.props;
    const renderCharacters = charactersList.map(character => <CharacterCard key={character.id} {...character} />);
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
              value={startsWith}
            />
          </FormGroup>
        </SearchComponent>
        {!isFetching ? <div className='characters_cards_wrapper'>{renderCharacters}</div> : <Loader />}
        {!isFetching && <Pagination requestData={this.requestData} />}
      </div>
    );
  }
}

CharachtersList.propTypes = {
  fetchHeroes: PropTypes.func,
  setSearchValue: PropTypes.func,
  charactersList: PropTypes.array,
  isFetching: PropTypes.bool,
  setFetchingState: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    charactersList: state.charactersList,
    isFetching: state.isFetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchHeroes: (startsWith, offset) => {
      dispatch(fetchCharacters(startsWith, offset));
    },
    setSearchValue: value => {
      dispatch({ type: types.SET_SEARCH_VALUE, payload: value });
    },
    setFetchingState: boolean => {
      dispatch({ type: types.IS_FETCHING, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharachtersList);
