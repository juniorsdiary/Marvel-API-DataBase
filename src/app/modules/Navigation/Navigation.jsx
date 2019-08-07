import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <nav className='navigation_block'>
    <NavLink exact to='/' className='navigation_block__link_item' activeClassName='active_nav_link'>
      Home
    </NavLink>
    <NavLink to='/characters' className='navigation_block__link_item' activeClassName='active_nav_link'>
      Characters
    </NavLink>
    <NavLink to='/comics' className='navigation_block__link_item' activeClassName='active_nav_link'>
      Comics
    </NavLink>
  </nav>
);

export default Navigation;
