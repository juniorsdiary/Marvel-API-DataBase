import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <nav className='navigation_links'>
    <NavLink exact to='/' className='navigation_block__link_item' activeClassName='active_nav_link'>
      Home
    </NavLink>
    <NavLink to='/characters' className='navigation_block__link_item' activeClassName='active_nav_link'>
      Characters
    </NavLink>
    <NavLink to='/comics' className='navigation_block__link_item' activeClassName='active_nav_link'>
      Comics
    </NavLink>
    <NavLink to='/events' className='navigation_block__link_item' activeClassName='active_nav_link'>
      Events
    </NavLink>
    <NavLink to='/series' className='navigation_block__link_item' activeClassName='active_nav_link'>
      Series
    </NavLink>
    <NavLink to='/creators' className='navigation_block__link_item' activeClassName='active_nav_link'>
      Creators
    </NavLink>
  </nav>
);

export default Navigation;
