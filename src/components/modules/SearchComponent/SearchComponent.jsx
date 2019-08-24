import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IoIosFunnel, IoIosCloseCircleOutline } from 'react-icons/io';
const SearchComponent = ({ children }) => {
  const [hiddenState, toogleHiddenState] = useState(true);
  return (
    <>
      <IoIosFunnel size='25' onClick={() => toogleHiddenState(!hiddenState)} className='filter_icon' />
      <div className={`filter_parametrs_block ${hiddenState ? 'hidden_block' : ''}`}>
        <IoIosCloseCircleOutline size='25' onClick={() => toogleHiddenState(true)} className='close_icon' />
        {children}
      </div>
    </>
  );
};

SearchComponent.propTypes = {
  children: PropTypes.node,
};

export default SearchComponent;
