import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ApiFactory } from 'Utilities';
import { ContentComponent, FilterComponent, ListItem, SettingsIcons } from 'Modules';
import { withLoader } from 'Components/hocs';

const ContentComponentWithLoader = withLoader()(ContentComponent);

class ListModule extends PureComponent {
  state = {
    startsWith: '',
    order: true,
    offset: 0,
    hiddenState: true,
    componentType: 'cards',
  };

  componentDidMount() {
    const { location } = this.props;
    const apiCheck = ApiFactory.apiHash.filter(item => item.pathname === location.pathname).length;
    const lastApicall = ApiFactory.apiHash.filter(item => item.pathname === location.pathname).slice(-1)[0];
    if (!apiCheck) {
      this.loadData();
    } else {
      if (lastApicall.search) {
        this.loadData();
      }
    }
  }

  loadData = () => {
    const { fetchData, setFetchingState, location } = this.props;
    const { startsWith, order, offset } = this.state;
    const apiHandler = ApiFactory.createApiHandler({ pathname: location.pathname, search: location.search, startsWith, offset, order });
    const apiStr = apiHandler.createApiString();
    setFetchingState(true);
    fetchData(apiStr);
  };

  setOffsetValue = offset => {
    this.setState({ offset }, () => {
      this.loadData();
    });
  };

  setHiddenState = hiddenState => {
    this.setState({ hiddenState });
  };

  setStateValue = e => {
    let startsWith = e.target.value;
    this.setState({ startsWith });
  };

  setOrderValue = order => {
    this.setState({ order });
  };

  setComponentType = componentType => {
    this.setState({ componentType });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setOffsetValue(0);
    this.setHiddenState(true);
    this.loadData();
  };

  render() {
    const { startsWith, order, offset, hiddenState, componentType } = this.state;
    const { data, totalResults, location, ItemComponent, fetchStatus } = this.props;
    return (
      <>
        <SettingsIcons
          hiddenState={hiddenState}
          showFilterBlock={this.setHiddenState}
          componentType={componentType}
          changeComponentType={this.setComponentType}
        />
        <div className='page_content'>
          <FilterComponent
            hiddenState={hiddenState}
            setStateValue={this.setStateValue}
            setHiddenState={this.setHiddenState}
            startsWith={startsWith}
            order={order}
            setOrderValue={this.setOrderValue}
            handleSubmit={this.handleSubmit}
          />
          <ContentComponentWithLoader
            loadData={this.loadData}
            fetchStatus={fetchStatus}
            renderData={data}
            Component={componentType === 'cards' ? ItemComponent : ListItem}
            pathname={location.pathname}
            setOffsetValue={this.setOffsetValue}
            offset={offset}
            totalResults={totalResults}
          />
        </div>
      </>
    );
  }
}

ListModule.propTypes = {
  fetchData: PropTypes.func,
  setFetchingState: PropTypes.func,
  data: PropTypes.array,
  isFetching: PropTypes.bool,
  totalResults: PropTypes.number,
  offset: PropTypes.number,
  location: PropTypes.object,
  ItemComponent: PropTypes.any,
  fetchStatus: PropTypes.object,
};

export default ListModule;