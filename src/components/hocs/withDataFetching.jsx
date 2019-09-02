import React, { Component } from 'react';
import { ApiFactory, constants } from 'Utilities';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

const withDataFetching = pathname => WrappedComponent => {
  class FetchingHOC extends Component {
    loadData = () => {
      const { fetchFunction, history, setFetchingState } = this.props;
      const search = history.location.pathname
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
    history: PropTypes.object,
    setFetchingState: PropTypes.func,
  };
  return withRouter(FetchingHOC);
};
export default withDataFetching;
