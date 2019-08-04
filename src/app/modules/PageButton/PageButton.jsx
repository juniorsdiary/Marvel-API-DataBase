import React from 'react';

const PageButton = ({ searchValue, pageInd, pageNum, requestData, baseOffset }) => (
  <span
    className={pageInd === pageNum ? 'pagination_block__page_item active_page_item' : 'pagination_block__page_item'}
    role='button'
    onClick={() => requestData(searchValue, pageInd * baseOffset)}>
    {pageInd}
  </span>
);

export default PageButton;
