import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PageButton = ({ className, searchValue, pageInd, requestData, baseOffset, textContent, changePage }) => {
  const commonClass = classNames('pagination_block__page_item', className);
  return (
    <span
      className={commonClass}
      role='button'
      onClick={() => {
        changePage((pageInd - 1) * baseOffset);
        requestData(searchValue, (pageInd - 1) * baseOffset);
      }}>
      {textContent ? textContent : pageInd}
    </span>
  );
};

PageButton.propTypes = {
  className: PropTypes.string,
  pageInd: PropTypes.number,
  requestData: PropTypes.func,
  baseOffset: PropTypes.number,
  searchValue: PropTypes.string,
  textContent: PropTypes.any,
  changePage: PropTypes.func,
};

export default PageButton;
