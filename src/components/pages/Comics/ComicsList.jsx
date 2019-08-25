import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchComics, types } from 'Store';
import { ApiFactory } from 'Utilities';
import { SearchCard, Pagination, ContentComponent, FilterComponent } from 'Modules';
import { withLoader } from 'Components/hocs.jsx';
import { IoIosFunnel } from 'react-icons/io';

const ContentComponentWithLoader = withLoader()(ContentComponent);

class ComicsList extends Component {
  state = {
    startsWith: '',
    order: true,
    offset: 0,
    hiddenState: true,
  };

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

  loadData() {
    const { fetchComicsData, setFetchingState, location } = this.props;
    const { startsWith, order, offset } = this.state;
    const apiHandler = ApiFactory.createApiHandler({ pathname: location.pathname, search: location.search, startsWith, order, offset });
    const apiStr = apiHandler.createApiString();
    setFetchingState(true);
    fetchComicsData(apiStr);
  }

  setStateValue = e => {
    let inputValue = e.target.value;
    this.setState({ inputValue });
  };

  setOffsetValue = offset => {
    this.setState({ offset }, () => {
      this.loadData();
    });
  };

  setHiddenState = hiddenState => {
    this.setState({ hiddenState });
  };

  setStateValue = e => {
    let startsWith = e.target.value;
    this.setState({ startsWith });
  };

  setOrderValue = order => {
    this.setState({ order });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.loadData();
    this.setHiddenState(true);
  };

  render() {
    const { startsWith, order, offset, hiddenState } = this.state;
    const { comicBooksData, isFetching, totalResults, location } = this.props;

    return (
      <div className='page_content'>
        {!isFetching && <IoIosFunnel size='25' onClick={() => this.setHiddenState(false)} className='filter_icon' />}
        <FilterComponent
          className={`characters_filter_form ${hiddenState ? 'hidden_block' : ''}`}
          setStateValue={this.setStateValue}
          setHiddenState={this.setHiddenState}
          hiddenState={hiddenState}
          startsWith={startsWith}
          order={order}
          setOrderValue={this.setOrderValue}
          handleSubmit={this.handleSubmit}
        />
        {!isFetching && <Pagination setOffset={this.setOffsetValue} totalResults={totalResults} offset={offset} />}
        <ContentComponentWithLoader loading={isFetching} renderData={comicBooksData} PartialComponent={SearchCard} pathname={location.pathname} />
      </div>
    );
  }
}

ComicsList.propTypes = {
  fetchComicsData: PropTypes.func,
  setFetchingState: PropTypes.func,
  comicBooksData: PropTypes.array,
  isFetching: PropTypes.bool,
  totalResults: PropTypes.number,
  offset: PropTypes.number,
  location: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    comicBooksData: state.comicsData.comicsList,
    totalResults: state.comicsData.totalResults,
    offset: state.comicsData.offset,
    isFetching: state.comicsData.isFetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchComicsData: url => {
      dispatch(fetchComics(url));
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
