import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ApiFactory } from 'Utilities';
import { ContentComponent, FilterComponent, ListItem, SettingsIcons } from 'Modules';
import { withLoader } from 'Components/hocs';
import axios from 'axios';

const ContentComponentWithLoader = withLoader(ContentComponent);

class ListModule extends PureComponent {
  state = {
    startsWith: '',
    order: true,
    hiddenState: true,
    componentType: 'cards',
  };

  componentDidMount() {
    const { history, fetchStatus } = this.props;
    const apiCheck = ApiFactory.apiHash.filter(item => item.pathname === history.location.pathname).length;
    const lastApicall = ApiFactory.apiHash.filter(item => item.pathname === history.location.pathname).slice(-1)[0];

    if (fetchStatus.message !== 'OK') {
      this.loadData();
    }
    if (!apiCheck) {
      this.loadData();
    } else if (lastApicall.search) {
      this.loadData();
    }
  }
  componentWillUnmount() {
    if (this.source) this.source.cancel();
  }

  loadData = changedOffset => {
    const { fetchData, setFetchingState, history } = this.props;
    const { startsWith, order } = this.state;
    const apiHandler = ApiFactory.createApiHandler({
      pathname: history.location.pathname,
      search: history.location.search,
      startsWith,
      offset: changedOffset,
      order,
    });
    const apiStr = apiHandler.createApiString();
    setFetchingState(true);
    const CancelToken = axios.CancelToken;
    this.source = CancelToken.source();
    fetchData(apiStr, this.source.token);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setHiddenState(true);
    this.loadData(0);
  };

  setStateValue = e => {
    let startsWith = e.target.value;
    this.setState({ startsWith });
  };

  setOrderValue = order => this.setState({ order });

  setComponentType = componentType => this.setState({ componentType });

  setHiddenState = hiddenState => this.setState({ hiddenState });

  render() {
    const { startsWith, order, hiddenState, componentType } = this.state;
    const { data, totalResults, ItemComponent, fetchStatus, offset } = this.props;
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
            setOffsetValue={this.loadData}
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
  history: PropTypes.object,
  ItemComponent: PropTypes.any,
  fetchStatus: PropTypes.object,
};

export default ListModule;
