import React from 'react';
import { IoIosMenu, IoIosClose } from 'react-icons/io';
import PropTypes from 'prop-types';

const HumburgerButton = ({ onClick, active }) => {
  return (
    <label htmlFor='toogle_navigation' className='navigation_toggle_block' onClick={onClick}>
      <IoIosClose size='35' className={`navigation_close ${active ? 'opened_humb' : 'closed_humb'}`} />
      <IoIosMenu size='35' className={`navigation_humb ${active ? 'closed_humb' : 'opened_humb'}`} />
    </label>
  );
};

HumburgerButton.propTypes = {
  onClick: PropTypes.func,
  active: PropTypes.bool,
};

export default HumburgerButton;
