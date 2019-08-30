import React from 'react';
import PropTypes from 'prop-types';
import { constants, definePagesIndex } from 'Utilities';
import { PageButton } from 'Modules';

const Pagination = ({ totalResults, offset, setOffset }) => {
  let pages = Math.ceil(totalResults / constants.PER_PAGE_RESULTS);
  let pageNum = offset / constants.PER_PAGE_RESULTS + 1;
  const pagesIndexes = definePagesIndex(pages, pageNum);
  const renderPageButtons = pagesIndexes.map(pageInd => (
    <PageButton
      key={pageInd}
      className={pageInd === pageNum ? 'active_page_item' : ''}
      pageInd={pageInd}
      setOffset={setOffset}
      baseOffset={constants.PER_PAGE_RESULTS}
    />
  ));

  return (
    <div className='pagination'>
      <p className='total_results'>Total results: {totalResults}</p>
      <div className='toogle_pages_block'>{renderPageButtons}</div>
    </div>
  );
};

Pagination.propTypes = {
  totalResults: PropTypes.number,
  offset: PropTypes.number,
  setOffset: PropTypes.func,
};

Pagination.defaultProps = {
  totalResults: 0,
  offset: 0,
  setOffset: () => {},
};

export default React.memo(Pagination);
