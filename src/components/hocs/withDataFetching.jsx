import React, { Component } from 'react';
import { ApiFactory, constants } from 'Utilities';
/* eslint-disable react/prop-types */
const withDataFetching = pathname => WrappedComponent => {
  return class FetchingHOC extends Component {
    componentDidMount() {
      const { callBack, location, fetchingCallBack } = this.props;
      const search = location.pathname
        .split('/')
        .join('=')
        .replace(/=/, '?');
      const apiHandler = ApiFactory.createApiHandler({ pathname, limit: 15, search });
      let secondPart = apiHandler.asSecondType();
      fetchingCallBack(true);
      callBack(`${constants.API_BASE}${secondPart}`);
    }
    render() {
      return <WrappedComponent pathname={pathname} {...this.props} />;
    }
  };
};
export default withDataFetching;
/* eslint-enable react/prop-types */
