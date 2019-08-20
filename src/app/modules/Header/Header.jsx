import React from 'react';
import Navigation from '../Navigation/Navigation.jsx';
import HumburgerButton from '../HumburgerButton/HumburgerButton.jsx';

import { Link } from 'react-router-dom';

const Header = () => (
  <header className='header_block'>
    <Link to='/'>
      <img src={require('../../../assets/images/marvel_logo.png')} alt='marvel_logo' />
    </Link>
    <HumburgerButton />
    <Navigation />
  </header>
);

export default Header;
