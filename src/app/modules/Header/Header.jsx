import React from 'react';
import Navigation from '../Navigation/Navigation.jsx';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className='header_block'>
    <Link to='/'>
      <img src='../images/marvel_logo_200.png' alt='marvel_logo' />
    </Link>
    <Navigation />
  </header>
);

export default Header;
