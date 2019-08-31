import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { types, fetchSingleCharacter } from 'Store';
import { convertToLocale, ApiFactory } from 'Utilities';
import { ErrorHandler, Loader, ImageAvatar, DetailsSection, SearchCard, ComicsAccordeon, SeriesAccordeon, EventsAccordeon } from 'Modules';

class CharacterPage extends Component {
  componentDidMount() {
    const { storeData } = this.props;
    if (!storeData) {
      this.loadPrimaryData();
    }
  }
  loadPrimaryData = () => {
    const { fetchCharacterData, location, setFetchingState } = this.props;
    const charactersAPI = ApiFactory.createApiHandler({ pathname: location.pathname });
    const apiStr = charactersAPI.createApiString();
    setFetchingState(true);
    fetchCharacterData(apiStr);
  };
  render() {
    const { fetchedData, storeData, fetchStatus, location } = this.props;
    const { name, description, modified, thumbnail, urls, comics, series, events } = storeData || fetchedData;
    const { isFetching, status, message } = fetchStatus;

    const baseSrc = thumbnail.path && `${thumbnail.path}/portrait_small.${thumbnail.extension}`;
    const src = thumbnail.path && `${thumbnail.path}.${thumbnail.extension}`;

    const lastModified = convertToLocale(modified);
    return (
      <div className='single_page_content'>
        {isFetching ? (
          <Loader />
        ) : !status ? (
          <ErrorHandler msg={message} size={'35'} loadData={() => this.loadPrimaryData()} />
        ) : (
          <div className='items_data_wrapper'>
            <h1 className='data_title'>{name}</h1>
            <ImageAvatar wrapper={true} className='character_page_image' baseSrc={baseSrc} src={src} />
            <DetailsSection name={name} description={description} url={urls && urls[0].url} lastModified={lastModified} />
            <ComicsAccordeon
              MappingComponent={SearchCard}
              location={location}
              number={comics.available}
              slider={true}
              contentClassName='default_slider_block'
              title={`Encountered in ${comics.available} comics`}
            />
            <SeriesAccordeon
              MappingComponent={SearchCard}
              location={location}
              number={series.available}
              slider={true}
              contentClassName='default_slider_block'
              title={`Encountered in ${series.available} series`}
            />
            <EventsAccordeon
              MappingComponent={SearchCard}
              number={events.available}
              location={location}
              slider={true}
              contentClassName='default_slider_block'
              title={`Encountered in ${events.available} events`}
            />
          </div>
        )}
      </div>
    );
  }
}

CharacterPage.propTypes = {
  storeData: PropTypes.object,
  fetchedData: PropTypes.object,
  fetchStatus: PropTypes.object,
  fetchCharacterData: PropTypes.func,
  setFetchingState: PropTypes.func,
  location: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id);
  return {
    storeData: state.charactersData.charactersList.filter(item => item.id === id)[0],
    fetchedData: state.charactersData.singleCharacter,
    fetchStatus: state.charactersData.fetchStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCharacterData: url => {
      dispatch(fetchSingleCharacter(url));
    },
    setFetchingState: boolean => {
      dispatch({ type: types.CHARACTERS_FETCHING, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterPage);
