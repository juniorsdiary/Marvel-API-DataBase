import React, { Component } from 'react';
import { Loader, ErrorHandler, Reload } from 'Modules';
/* eslint-disable react/prop-types */
const withLoader = () => WrappedComponent => {
  return class LoadingHOC extends Component {
    render() {
      const { fetchStatus, loadData } = this.props;
      const { isFetching, status, message } = fetchStatus;
      return isFetching ? (
        <Loader />
      ) : status ? (
        <WrappedComponent {...this.props} />
      ) : (
        <>
          <ErrorHandler msg={message} />
          <Reload size={'35'} loadData={loadData} />
        </>
      );
    }
  };
};
/* eslint-enable react/prop-types */
export default withLoader;
