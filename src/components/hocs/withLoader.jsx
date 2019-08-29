import React, { Component } from 'react';
import { Loader, ErrorHandler } from 'Modules';
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
          <ErrorHandler size={'35'} msg={message} loadData={loadData} />
        </>
      );
    }
  };
};
/* eslint-enable react/prop-types */
export default withLoader;
