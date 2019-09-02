import React, { Component } from 'react';
import { ApiFactory } from 'Utilities';
import axios from 'axios';
import PropTypes from 'prop-types';

const singlePageModule = Content => {
  class SinglePageModule extends Component {
    componentDidMount() {
      const { storeData } = this.props;
      if (!storeData) {
        this.loadPrimaryData();
      }
    }
    componentWillUnmount() {
      if (this.source) this.source.cancel();
    }
    loadPrimaryData = () => {
      const { fetchFunction, location, setFetchingState } = this.props;
      const charactersAPI = ApiFactory.createApiHandler({ pathname: location.pathname });
      const apiStr = charactersAPI.createApiString();
      setFetchingState(true);
      const CancelToken = axios.CancelToken;
      this.source = CancelToken.source();
      fetchFunction(apiStr, this.source.token);
    };
    componentDidUpdate(prevProps) {
      if (prevProps.location.pathname !== this.props.location.pathname) {
        this.loadPrimaryData();
      }
    }
    render() {
      const { location, fetchedData, storeData, fetchStatus } = this.props;
      const data = storeData || fetchedData;

      return (
        <div className='single_page_content'>
          <Content fetchStatus={fetchStatus} size={'35'} data={data} location={location} loadData={this.loadPrimaryData} />
        </div>
      );
    }
  }
  SinglePageModule.propTypes = {
    fetchFunction: PropTypes.func,
    location: PropTypes.object,
    setFetchingState: PropTypes.func,
    fetchedData: PropTypes.object,
    storeData: PropTypes.object,
    fetchStatus: PropTypes.object,
  };
  return SinglePageModule;
};
export default singlePageModule;
