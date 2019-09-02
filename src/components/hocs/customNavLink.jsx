import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function customNavLink(path) {
  class MyNavLink extends Component {
    render() {
      const { to, text, ...props } = this.props;
      return (
        <NavLink exact to={to} className='navigation_block__link_item' activeClassName='active_nav_link' {...props}>
          {text}
        </NavLink>
      );
    }
  }
  MyNavLink.propTypes = {
    to: PropTypes.string,
    text: PropTypes.string,
  };
  return MyNavLink;
}
