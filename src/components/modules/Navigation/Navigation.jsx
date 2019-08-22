import React from 'react';
import PropTypes from 'prop-types';
import { customNavLink } from 'Components/hocs.jsx';

const MyNavLink = customNavLink();

const Navigation = ({ onClick, className }) => {
  return (
    <nav className={`navigation_links ${className}`}>
      <MyNavLink to='/' text={'Home'} onClick={onClick} />
      <MyNavLink to='/characters' text={'Characters'} onClick={onClick} />
      <MyNavLink to='/comics' text={'Comics'} onClick={onClick} />
      <MyNavLink to='/events' text={'Events'} onClick={onClick} />
      <MyNavLink to='/series' text={'Series'} onClick={onClick} />
      <MyNavLink to='/creators' text={'Creators'} onClick={onClick} />
    </nav>
  );
};

Navigation.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Navigation;
