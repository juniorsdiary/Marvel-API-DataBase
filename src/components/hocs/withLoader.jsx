import React, { Component } from 'react';
import { Loader } from 'Modules';
/* eslint-disable react/prop-types */
const withLoader = () => WrappedComponent => {
  return class LoadingHOC extends Component {
    render() {
      return this.props.loading ? <Loader /> : <WrappedComponent {...this.props} />;
    }
  };
};
/* eslint-enable react/prop-types */
export default withLoader;
