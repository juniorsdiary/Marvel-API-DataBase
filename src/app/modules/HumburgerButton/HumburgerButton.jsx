import React from 'react';
import { IoIosMenu, IoIosClose } from 'react-icons/io';

const HumburgerButton = () => {
  return (
    <>
      <input type='checkbox' id='toogle_navigation' />
      <label htmlFor='toogle_navigation' className='navigation_toggle_block'>
        <IoIosMenu size='35' className='navigation_humb' />
        <IoIosClose size='35' className='navigation_close' />
      </label>
    </>
  );
};

export default HumburgerButton;
