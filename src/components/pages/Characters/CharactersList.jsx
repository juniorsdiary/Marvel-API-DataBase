import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCharacters, types } from 'Store';
import { ApiFactory } from 'Utilities';
import { CharacterCard, ContentComponent, FilterComponent, ListItem, Pagination, SettingsIcons } from 'Modules';
import { withLoader } from 'Components/hocs.jsx';

const ContentComponentWithLoader = withLoader()(ContentComponent);

class CharachtersList extends Component {
  state = {
    startsWith: '',
    order: true,
    offset: 0,
    hiddenState: true,
    componentType: 'cards',
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

  loadData = () => {
    const { fetchHeroes, setFetchingState, location } = this.props;
    const { startsWith, order, offset } = this.state;
    const apiHandler = ApiFactory.createApiHandler({ pathname: location.pathname, search: location.search, startsWith, offset, order });
    const apiStr = apiHandler.createApiString();
    setFetchingState(true);
    fetchHeroes(apiStr);
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

  setComponentType = componentType => {
    this.setState({ componentType });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.loadData();
    this.setHiddenState(true);
  };

  render() {
    const { startsWith, order, offset, hiddenState, componentType } = this.state;
    const { charactersList, isFetching, totalResults, location } = this.props;
    return (
      <div className='page_content'>
        {!isFetching && (
          <>
            <SettingsIcons showFilterBlock={this.setHiddenState} componentType={componentType} changeComponentType={this.setComponentType} />
            <Pagination setOffset={this.setOffsetValue} totalResults={totalResults} offset={offset} />
          </>
        )}
        <FilterComponent
          hiddenState={hiddenState}
          setStateValue={this.setStateValue}
          setHiddenState={this.setHiddenState}
          startsWith={startsWith}
          order={order}
          setOrderValue={this.setOrderValue}
          handleSubmit={this.handleSubmit}
        />
        <ContentComponentWithLoader
          loading={isFetching}
          renderData={charactersList}
          Component={componentType === 'cards' ? CharacterCard : ListItem}
          pathname={location.pathname}
        />
      </div>
    );
  }
}

CharachtersList.propTypes = {
  fetchHeroes: PropTypes.func,
  setFetchingState: PropTypes.func,
  charactersList: PropTypes.array,
  isFetching: PropTypes.bool,
  totalResults: PropTypes.number,
  offset: PropTypes.number,
  location: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    charactersList: state.charactersData.charactersList,
    totalResults: state.charactersData.totalResults,
    offset: state.charactersData.offset,
    isFetching: state.charactersData.isFetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchHeroes: url => {
      dispatch(fetchCharacters(url));
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
