import React, { Component } from 'react';
import { Loader, ErrorHandler } from 'Modules';
import PropTypes from 'prop-types';

const withLoader = WrappedComponent => {
  class LoadingHOC extends Component {
    render() {
      const { fetchStatus, loadData } = this.props;
      const { isFetching, status, message } = fetchStatus;
      return isFetching ? (
        <Loader />
      ) : status ? (
        <WrappedComponent {...this.props} />
      ) : (
        <>
          <ErrorHandler size={'35'} msg={message} loadData={loadData} />
        </>
      );
    }
  }
  LoadingHOC.propTypes = {
    fetchStatus: PropTypes.object,
    loadData: PropTypes.func,
  };
  return LoadingHOC;
};

export default withLoader;
