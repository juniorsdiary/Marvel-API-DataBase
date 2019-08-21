import React, { useState } from 'react';
import Navigation from '../Navigation/Navigation.jsx';
import HumburgerButton from '../HumburgerButton/HumburgerButton.jsx';

import { Link } from 'react-router-dom';

const Header = () => {
  const [active, setActive] = useState(false);
  const toggleHumb = () => {
    setActive(!active);
  };
  return (
    <header className='header_block'>
      <Link to='/'>
        <img src={require('../../../assets/images/marvel_logo.png')} alt='marvel_logo' />
      </Link>
      <HumburgerButton onClick={toggleHumb} active={active} />
      <Navigation onClick={toggleHumb} className={active ? 'opened' : 'closed'} />
    </header>
  );
};

export default Header;
