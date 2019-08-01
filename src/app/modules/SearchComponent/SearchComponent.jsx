import React from 'react';
import PropTypes from 'prop-types';

const SearchComponent = ({ titleText, classNames, toogleAppearence, active, children }) => {
  const constructedClass = active ? `flex-1 ${classNames.wrapper}` : `flex-0 ${classNames.wrapper}`;
  return (
    <div className={constructedClass} onClick={toogleAppearence}>
      <p className={classNames.title}>{titleText}</p>
      {children}
    </div>
  );
};

SearchComponent.propTypes = {
  titleText: PropTypes.string,
  classNames: PropTypes.object,
  toogleAppearence: PropTypes.func,
  children: PropTypes.node,
  active: PropTypes.bool,
};

export default SearchComponent;
