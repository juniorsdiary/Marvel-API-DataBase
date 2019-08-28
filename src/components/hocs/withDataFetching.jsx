import React, { Component } from 'react';
import { ApiFactory, constants } from 'Utilities';
/* eslint-disable react/prop-types */
const withDataFetching = pathname => WrappedComponent => {
  return class FetchingHOC extends Component {
    loadData = () => {
      const { callBack, location, fetchingCallBack } = this.props;
      const search = location.pathname
        .split('/')
        .join('=')
        .replace(/=/, '?');
      const apiHandler = ApiFactory.createApiHandler({ pathname, limit: 15, search, order: true });
      let secondPart = apiHandler.asSecondType();
      fetchingCallBack(true);
      callBack(`${constants.API_BASE}${secondPart}`);
    };
    componentDidMount() {
      this.loadData();
    }
    render() {
      return <WrappedComponent pathname={pathname} {...this.props} loadData={this.loadData} />;
    }
  };
};
export default withDataFetching;
/* eslint-enable react/prop-types */
