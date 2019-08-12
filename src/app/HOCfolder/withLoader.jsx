import React, { Component } from 'react';
import Loader from '../modules/Loader/Loader.jsx';

const withLoader = loading => WrappedComponent => {
  return class LoadingHOC extends Component {
    render() {
      return loading ? <Loader /> : <WrappedComponent {...this.props} />;
    }
  };
};

export default withLoader;
