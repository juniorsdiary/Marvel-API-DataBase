import React, { Component } from 'react';
import { ApiFactory } from 'Utilities';
/* eslint-disable react/prop-types */
const singlePageModule = Content => {
  return class SinglePageModule extends Component {
    componentDidMount() {
      const { storeData } = this.props;
      if (!storeData) {
        this.loadPrimaryData();
      }
    }
    loadPrimaryData = () => {
      const { fetchFunction, location, setFetchingState } = this.props;
      const charactersAPI = ApiFactory.createApiHandler({ pathname: location.pathname });
      const apiStr = charactersAPI.createApiString();
      setFetchingState(true);
      fetchFunction(apiStr);
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
  };
};
/* eslint-enable react/prop-types */
export default singlePageModule;
