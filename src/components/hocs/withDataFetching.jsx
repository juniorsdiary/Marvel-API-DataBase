import React, { Component } from 'react';
import { ApiFactory, constants } from 'Utilities';
/* eslint-disable react/prop-types */
const withDataFetching = pathname => WrappedComponent => {
  return class FetchingHOC extends Component {
    loadData = () => {
      const { fetchFunction, location, setFetchingState } = this.props;
      const search = location.pathname
        .split('/')
        .join('=')
        .replace(/=/, '?');
      const apiHandler = ApiFactory.createApiHandler({ pathname, limit: 15, search, order: true });
      let secondPart = apiHandler.asSecondType();
      setFetchingState(true);
      fetchFunction(`${constants.API_BASE}${secondPart}`);
    };
    componentDidMount() {
      this.loadData();
    }
    render() {
      return <WrappedComponent pathname={pathname} loadData={this.loadData} {...this.props} />;
    }
  };
};
export default withDataFetching;
/* eslint-enable react/prop-types */
