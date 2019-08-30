import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { types, fetchSingleSeries } from 'Store';
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
  EventsAccordeon,
  ComicsAccordeon,
} from 'Modules';

class SingleSeriesPage extends Component {
  componentDidMount() {
    const { storeData } = this.props;
    if (!storeData) {
      this.loadPrimaryData();
    }
  }
  loadPrimaryData = () => {
    const { fetchSeriesData, location, setFetchingState } = this.props;
    const charactersAPI = ApiFactory.createApiHandler({ pathname: location.pathname });
    const apiStr = charactersAPI.createApiString();
    setFetchingState(true);
    fetchSeriesData(apiStr);
  };
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.loadPrimaryData();
    }
  }
  render() {
    const { location, fetchedData, storeData, fetchStatus } = this.props;
    const { title, description, modified, thumbnail, urls, comics, creators, characters, events, previous, next } = storeData || fetchedData;
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
                <span>Previous</span>
                <span>{previous.name}</span>
              </Link>
            )}
            {next && (
              <Link to={`/${nextLink}`} className='adjasent_item_link'>
                <span>Next</span>
                <span>{next.name}</span>
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
            <EventsAccordeon
              MappingComponent={SearchCard}
              number={events.available}
              location={location}
              slider={true}
              contentClassName='default_content_block'
              title={`Part of ${events.available} events`}
            />
            <CreatorsComponent data={creators.items} number={creators.available} location={location} pathname={'/creators'} />
          </div>
        )}
      </div>
    );
  }
}

SingleSeriesPage.propTypes = {
  storeData: PropTypes.object,
  fetchedData: PropTypes.object,
  fetchSeriesData: PropTypes.func,
  fetchStatus: PropTypes.object,
  setFetchingState: PropTypes.func,
  location: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id);
  return {
    storeData: state.seriesData.seriesList.filter(item => item.id === id)[0],
    fetchedData: state.seriesData.seriesBook,
    fetchStatus: state.seriesData.fetchStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSeriesData: url => {
      dispatch(fetchSingleSeries(url));
    },
    setFetchingState: boolean => {
      dispatch({ type: types.SERIES_FETCHING, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleSeriesPage);
