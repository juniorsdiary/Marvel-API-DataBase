import React, { Component } from 'react';
import ApiFactory from '../utilities/apiFactory';
import * as constants from '../utilities/constants';

const withDataFetching = pathname => WrappedComponent => {
  return class FetchingHOC extends Component {
    componentDidMount() {
      const { callBack, location } = this.props;
      const apiHandler = ApiFactory.createApiHandler({ pathname, limit: 15 });
      let secondPart = apiHandler.asSecondType();
      const apiStr = `${constants.API_BASE}${location.pathname}${secondPart}`;
      callBack(apiStr);
    }
    render() {
      return <WrappedComponent pathname={pathname} location={location} {...this.props} />;
    }
  };
};

export default withDataFetching;
