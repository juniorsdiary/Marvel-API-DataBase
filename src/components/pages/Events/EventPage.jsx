import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { types, fetchSingleEvent } from 'Store';
import { convertToLocale, ApiFactory } from 'Utilities';
import {
  ErrorHandler,
  CreatorsComponent,
  Loader,
  ImageAvatar,
  DetailsSection,
  SearchCard,
  CharacterCard,
  CharactersAccordeon,
  ComicsAccordeon,
  SeriesAccordeon,
} from 'Modules';

class EventPage extends Component {
  componentDidMount() {
    const { storeData } = this.props;
    if (!storeData) {
      this.loadPrimaryData();
    }
  }
  loadPrimaryData = () => {
    const { fetchEventData, location, setFetchingState } = this.props;
    const charactersAPI = ApiFactory.createApiHandler({ pathname: location.pathname });
    const apiStr = charactersAPI.createApiString();
    setFetchingState(true);
    fetchEventData(apiStr);
  };
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.loadPrimaryData();
    }
  }
  render() {
    const { location, fetchStatus, fetchedData, storeData } = this.props;
    const data = storeData || fetchedData;
    const { title, description, modified, thumbnail, urls, comics, creators, characters, series, previous, next } = data;
    const { isFetching, status, message } = fetchStatus;

    const baseSrc = thumbnail.path ? `${thumbnail.path}/portrait_small.${thumbnail.extension}` : '';
    const src = thumbnail.path ? `${thumbnail.path}.${thumbnail.extension}` : '';

    const lastModified = convertToLocale(modified);

    const prevLink = previous && previous.resourceURI.match(/\w+\/\d+/)[0];
    const nextLink = next && next.resourceURI.match(/\w+\/\d+/)[0];

    return (
      <div className='page_content'>
        {isFetching ? (
          <Loader />
        ) : !status ? (
          <ErrorHandler msg={message} size={'35'} loadData={() => this.loadPrimaryData()} />
        ) : (
          <div className='items_data_wrapper'>
            <h1 className='data_title'>{title}</h1>
            <ImageAvatar wrapper={true} className='cover_book_image' baseSrc={baseSrc} src={src} />
            <DetailsSection name={title} description={description} url={urls && urls[0].url} lastModified={lastModified} />
            {previous && (
              <Link to={`/${prevLink}`} className='adjasent_item_link'>
                Previous - {previous.name}
              </Link>
            )}
            {next && (
              <Link to={`/${nextLink}`} className='adjasent_item_link'>
                Next - {next.name}
              </Link>
            )}
            <CharactersAccordeon
              MappingComponent={CharacterCard}
              number={characters.available}
              location={location}
              slider={true}
              contentClassName='default_slider_block'
              title={`You can meet ${characters.available} characters`}
            />
            <ComicsAccordeon
              MappingComponent={SearchCard}
              number={comics.available}
              location={location}
              slider={true}
              contentClassName='default_slider_block'
              title={`Contains ${comics.available} comics`}
            />
            <SeriesAccordeon
              MappingComponent={SearchCard}
              number={series.available}
              location={location}
              slider={true}
              contentClassName='default_slider_block'
              title={`Contains ${series.available} series`}
            />
            <CreatorsComponent data={creators.items} number={creators.available} location={location} pathname={'/creators'} />
          </div>
        )}
      </div>
    );
  }
}

EventPage.propTypes = {
  storeData: PropTypes.object,
  fetchedData: PropTypes.object,
  fetchStatus: PropTypes.object,
  fetchEventData: PropTypes.func,
  setFetchingState: PropTypes.func,
  location: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id);
  return {
    storeData: state.eventsData.eventsList.filter(item => item.id === id)[0],
    fetchedData: state.eventsData.eventItem,
    fetchStatus: state.eventsData.fetchStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEventData: url => {
      dispatch(fetchSingleEvent(url));
    },
    setFetchingState: boolean => {
      dispatch({ type: types.EVENTS_FETCHING, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPage);
