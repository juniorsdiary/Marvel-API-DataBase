import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { types, fetchSingleCreator } from 'Store';
import { ErrorHandler, Loader, SearchCard, ComicsAccordeon, EventsAccordeon, SeriesAccordeon } from 'Modules';
import { ApiFactory } from 'Utilities';

class CreatorPage extends Component {
  componentDidMount() {
    this.loadPrimaryData();
  }
  loadPrimaryData = () => {
    const { fetchCreatorData, location, setFetchingState } = this.props;
    const charactersAPI = ApiFactory.createApiHandler({ pathname: location.pathname });
    const apiStr = charactersAPI.createApiString();
    setFetchingState(true);
    fetchCreatorData(apiStr);
  };
  render() {
    const { location, fetchedData, fetchStatus } = this.props;
    const { comics, events, series } = fetchedData;
    const { isFetching, status, message } = fetchStatus;

    return (
      <div className='page_content'>
        {isFetching ? (
          <Loader />
        ) : !status ? (
          <ErrorHandler msg={message} size={'35'} loadData={() => this.loadPrimaryData()} />
        ) : (
          <div className='items_data_wrapper'>
            <p className='creator_page_name'>{fetchedData.fullName}</p>
            <ComicsAccordeon
              MappingComponent={SearchCard}
              number={comics.available}
              location={location}
              slider={true}
              contentClassName='default_slider_block'
              title={`Took part in ${comics.available} comics`}
            />
            <EventsAccordeon
              MappingComponent={SearchCard}
              number={events.available}
              location={location}
              slider={true}
              contentClassName='default_slider_block'
              title={`Created ${events.available} events`}
            />
            <SeriesAccordeon
              MappingComponent={SearchCard}
              number={series.available}
              location={location}
              slider={true}
              contentClassName='default_slider_block'
              title={`Creator of ${series.available} series`}
            />
          </div>
        )}
      </div>
    );
  }
}

CreatorPage.propTypes = {
  fetchedData: PropTypes.object,
  fetchCreatorData: PropTypes.func,
  fetchStatus: PropTypes.object,
  setFetchingState: PropTypes.func,
  location: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  return {
    fetchedData: state.creatorsData.creator,
    fetchStatus: state.creatorsData.fetchStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCreatorData: url => {
      dispatch(fetchSingleCreator(url));
    },
    setFetchingState: boolean => {
      dispatch({ type: types.CREATORS_FETCHING, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatorPage);
