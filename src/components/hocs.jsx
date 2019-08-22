import React, { Component } from 'react';
import Loader from 'Modules/Loader/Loader.jsx';
import { NavLink } from 'react-router-dom';
import ApiFactory from 'Utilities/apiFactory';
import * as constants from 'Utilities/constants';

export const arrowWithCustomWrapper = () => WrappedComponent => {
  return class WrappedArrow extends Component {
    render() {
      return (
        <div tabIndex='-1' role='button' className='custom_arrow slick-arrow' onClick={this.props.onClick} onKeyUp={this.props.onClick}>
          <WrappedComponent size='25' />
        </div>
      );
    }
  };
};

export function customNavLink(path) {
  return class MyNavLink extends React.Component {
    render() {
      const { to, text, ...props } = this.props;
      return (
        <NavLink exact to={to} className='navigation_block__link_item' activeClassName='active_nav_link' {...props}>
          {text}
        </NavLink>
      );
    }
  };
}

export const withDataFetching = pathname => WrappedComponent => {
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

export const withLoader = () => WrappedComponent => {
  return class LoadingHOC extends Component {
    render() {
      return this.props.loading ? <Loader /> : <WrappedComponent {...this.props} />;
    }
  };
};
