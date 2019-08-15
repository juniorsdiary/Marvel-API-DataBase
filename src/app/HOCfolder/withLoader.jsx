import React, { Component } from 'react';
import Loader from '../modules/Loader/Loader.jsx';

const withLoader = () => WrappedComponent => {
  return class LoadingHOC extends Component {
    render() {
      return this.props.loading ? <Loader /> : <WrappedComponent {...this.props} />;
    }
  };
};

export default withLoader;
