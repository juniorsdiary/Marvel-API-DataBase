import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
/* eslint-disable react/prop-types */
export default function customNavLink(path) {
  return class MyNavLink extends Component {
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
/* eslint-enable react/prop-types */
