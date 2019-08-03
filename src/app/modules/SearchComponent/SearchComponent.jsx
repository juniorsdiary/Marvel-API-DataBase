import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useToogleSearch } from '../../customHooks';

const SearchComponent = ({ children }) => {
  const ref = useRef(null);
  const [constructedClass, changeClass] = useToogleSearch(ref);
  // changeClass();
  return (
    <div className={constructedClass} ref={ref}>
      <div className='search__title' onClick={() => changeClass()}>
        <p>Search Parametrs</p>
      </div>
      {children}
    </div>
  );
};

SearchComponent.propTypes = {
  children: PropTypes.node,
};

export default SearchComponent;
