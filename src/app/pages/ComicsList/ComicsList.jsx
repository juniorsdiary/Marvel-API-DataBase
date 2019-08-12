import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchComics } from '../../store/actions';
import * as types from '../../store/types';
import ApiFactory from '../../utilities/apiFactory';
import SearchComponent from '../../modules/SearchComponent/SearchComponent.jsx';
import FormGroup from '../../modules/FormGroup/FormGroup.jsx';
import InputElement from '../../modules/InputElement/InputElement.jsx';
import ComicBookSearchCard from '../../modules/ComicBookSearchCard/ComicBookSearchCard.jsx';
import Loader from '../../modules/Loader/Loader.jsx';
import Pagination from '../../modules/Pagination/Pagination.jsx';

class ComicsList extends Component {
  state = {
    startsWith: '',
  };
  componentDidMount() {
    const { fetchComicsData, setFetchingState, comicBooksData } = this.props;
    if (comicBooksData.length === 0) {
      setFetchingState(true);
      const apiHandler = ApiFactory.createApiHandler({ type: 'comics' });
      const apiStr = apiHandler.createApiString();
      fetchComicsData(apiStr);
    }
  }

  setStateValue = e => {
    let startsWith = e.target.value;
    this.setState({ startsWith });
  };

  requestData = offset => {
    const { fetchComicsData, setSearchValue, setFetchingState } = this.props;
    const { startsWith } = this.state;

    const apiHandler = ApiFactory.createApiHandler({ type: 'comics', startsWith, offset });
    const apiStr = apiHandler.createApiString();

    setSearchValue(startsWith);
    setFetchingState(true);
    fetchComicsData(apiStr);

    this.setState({ startsWith: '' });
  };
  render() {
    const { startsWith } = this.state;
    const { comicBooksData, isFetching } = this.props;
    const renderComics = comicBooksData.map(comicBook => <ComicBookSearchCard key={comicBook.id} {...comicBook} />);
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
              value={startsWith}
            />
          </FormGroup>
        </SearchComponent>
        {!isFetching ? <div className='comics_cards_wrapper'>{renderComics}</div> : <Loader />}
        {!isFetching && <Pagination requestData={this.requestData} />}
      </div>
    );
  }
}

ComicsList.propTypes = {
  fetchComicsData: PropTypes.func,
  setSearchValue: PropTypes.func,
  comicBooksData: PropTypes.array,
  isFetching: PropTypes.bool,
  setFetchingState: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    comicBooksData: state.comicBooksData,
    isFetching: state.isFetching,
    router: state.router,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchComicsData: (startsWith, offset) => {
      dispatch(fetchComics(startsWith, offset));
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
)(ComicsList);
