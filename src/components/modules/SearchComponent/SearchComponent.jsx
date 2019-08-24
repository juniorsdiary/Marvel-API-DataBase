import React from 'react';
import PropTypes from 'prop-types';

const SearchComponent = ({ children, hiddenState }) => {
  return (
    <>
      <div>{children}</div>
    </>
  );
};

SearchComponent.propTypes = {
  children: PropTypes.node,
  hiddenState: PropTypes.bool,
  toogleHiddenState: PropTypes.func,
};

export default SearchComponent;
