import React, { useState } from 'react';
import { Navigation, HumburgerButton } from 'Modules';
import { Link } from 'react-router-dom';

const Header = () => {
  const [active, setActive] = useState(false);
  const toggleHumb = () => {
    setActive(!active);
  };
  return (
    <header className='header_block'>
      <Link to='/' className='home_link_logo'>
        <img src={require('Assets/images/marvel_logo.png')} alt='marvel_logo' />
      </Link>
      <HumburgerButton onClick={toggleHumb} active={active} />
      <Navigation onClick={toggleHumb} className={active ? 'opened' : 'closed'} />
    </header>
  );
};

export default Header;
