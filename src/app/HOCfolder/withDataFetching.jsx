import React, { Component } from 'react';
import ApiFactory from '../utilities/apiFactory';
import * as constants from '../utilities/constants';

const withDataFetching = pathname => WrappedComponent => {
  return class FetchingHOC extends Component {
    componentDidMount() {
      const { callBack, location } = this.props;
      const search = location.pathname
        .split('/')
        .join('=')
        .replace(/=/, '?');
      const apiHandler = ApiFactory.createApiHandler({ pathname, limit: 15, search });
      let secondPart = apiHandler.asSecondType();
      const apiStr = `${constants.API_BASE}${secondPart}`;
      callBack(apiStr);
    }
    render() {
      return <WrappedComponent pathname={pathname} location={location} {...this.props} />;
    }
  };
};

export default withDataFetching;
