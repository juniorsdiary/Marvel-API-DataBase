import React, { Component } from 'react';
import { ApiFactory, constants } from 'Utilities';
import PropTypes from 'prop-types';
import axios from 'axios';

const withDataFetching = pathname => WrappedComponent => {
  class FetchingHOC extends Component {
    loadData = () => {
      const { fetchFunction, location, setFetchingState } = this.props;
      const search = location.pathname
        .split('/')
        .join('=')
        .replace(/=/, '?');
      const apiHandler = ApiFactory.createApiHandler({ pathname, limit: 15, search, order: true });
      let secondPart = apiHandler.asSecondType();
      setFetchingState(true);
      const CancelToken = axios.CancelToken;
      this.source = CancelToken.source();
      fetchFunction(`${constants.API_BASE}${secondPart}`, this.source.token);
    };
    componentDidMount() {
      this.loadData();
    }
    componentWillUnmount() {
      if (this.source) this.source.cancel();
    }
    render() {
      return <WrappedComponent pathname={pathname} loadData={this.loadData} {...this.props} />;
    }
  }
  FetchingHOC.propTypes = {
    fetchFunction: PropTypes.func,
    location: PropTypes.object,
    setFetchingState: PropTypes.func,
  };
  return FetchingHOC;
};
export default withDataFetching;
