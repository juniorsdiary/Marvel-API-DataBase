import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { types, fetchSingleComicBook } from 'Store';
import { convertToLocale, ApiFactory } from 'Utilities';
import {
  CreatorsComponent,
  ErrorHandler,
  Loader,
  ImageAvatar,
  EventsAccordeon,
  CharactersAccordeon,
  DetailsSection,
  SearchCard,
  CharacterCard,
} from 'Modules';

class ComicBookPage extends Component {
  componentDidMount() {
    const { storeData } = this.props;
    if (!storeData) {
      this.loadPrimaryData();
    }
  }
  loadPrimaryData = () => {
    const { fetchComicsData, location, setFetchingState } = this.props;
    const charactersAPI = ApiFactory.createApiHandler({ pathname: location.pathname });
    const apiStr = charactersAPI.createApiString();
    setFetchingState(true);
    fetchComicsData(apiStr);
  };
  render() {
    const { location, fetchStatus } = this.props;
    const { fetchedData, storeData } = this.props;
    const { title, description, modified, thumbnail, urls, characters, creators, events } = storeData || fetchedData;
    const { isFetching, status, message } = fetchStatus;

    const baseSrc = thumbnail.path ? `${thumbnail.path}/portrait_small.${thumbnail.extension}` : '';
    const src = thumbnail.path ? `${thumbnail.path}.${thumbnail.extension}` : '';

    const lastModified = convertToLocale(modified);

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
            <CharactersAccordeon
              MappingComponent={CharacterCard}
              number={characters.available}
              location={location}
              slider={true}
              contentClassName='default_slider_block'
              title={`You can meet ${characters.available} characters`}
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

ComicBookPage.propTypes = {
  storeData: PropTypes.object,
  fetchedData: PropTypes.object,
  fetchComicsData: PropTypes.func,
  fetchStatus: PropTypes.object,
  setFetchingState: PropTypes.func,
  location: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id);
  return {
    storeData: state.comicsData.comicsList.filter(item => item.id === id)[0],
    fetchedData: state.comicsData.comicBook,
    fetchStatus: state.comicsData.fetchStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchComicsData: url => {
      dispatch(fetchSingleComicBook(url));
    },
    setFetchingState: boolean => {
      dispatch({ type: types.COMICS_FETCHING, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComicBookPage);
