import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PageButton = ({ className, pageInd, baseOffset, textContent, setOffset }) => {
  const commonClass = classNames('pagination_block__page_item', className);
  return (
    <span
      className={commonClass}
      role='button'
      tabIndex='-1'
      onKeyPress={() => setOffset((pageInd - 1) * baseOffset)}
      onClick={() => setOffset((pageInd - 1) * baseOffset)}>
      {textContent ? textContent : pageInd}
    </span>
  );
};

PageButton.propTypes = {
  className: PropTypes.string,
  pageInd: PropTypes.number,
  baseOffset: PropTypes.number,
  textContent: PropTypes.any,
  setOffset: PropTypes.func,
};

PageButton.defaultProps = {
  setOffset: () => {},
};

export default PageButton;
