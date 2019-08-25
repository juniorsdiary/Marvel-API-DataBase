import React from 'react';
import PropTypes from 'prop-types';
import { constants, definePagesIndex } from 'Utilities';
import { PageButton } from 'Modules';

const Pagination = ({ totalResults, offset, setOffset }) => {
  let pages = Math.ceil(totalResults / constants.PER_PAGE_RESULTS);

  let pageNum = offset / constants.PER_PAGE_RESULTS + 1;

  const [firstPages, lastPages, middlePages] = definePagesIndex(pageNum, pages);

  const renderFirstPages = firstPages.map(pageInd => (
    <PageButton
      key={pageInd}
      className={pageInd === pageNum ? 'active_page_item' : ''}
      pageInd={pageInd}
      setOffset={setOffset}
      baseOffset={constants.PER_PAGE_RESULTS}
    />
  ));

  const renderLastPages = lastPages.map(pageInd => (
    <PageButton
      key={pageInd}
      className={pageInd === pageNum ? 'active_page_item' : ''}
      pageInd={pageInd}
      setOffset={setOffset}
      baseOffset={constants.PER_PAGE_RESULTS}
    />
  ));

  const renderMiddlePages = middlePages.map(pageInd => (
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
      <div className='toogle_pages_block'>
        {pages > 1 && (
          <PageButton
            className={pageNum === 1 ? 'inactive_page_item' : ''}
            pageInd={pageNum - 1}
            setOffset={pageNum > 1 ? setOffset : () => {}}
            baseOffset={constants.PER_PAGE_RESULTS}
            textContent='Previous'
          />
        )}
        {renderFirstPages}
        {pageNum >= 7 ? <PageButton className='inactive_page_item' textContent='...' /> : null}
        {renderMiddlePages}
        {pageNum <= pages - 6 && pages > 8 ? <PageButton className='inactive_page_item' textContent='...' /> : null}
        {pages > 4 ? renderLastPages : null}
        {pages > 1 && (
          <PageButton
            className={pageNum === pages ? 'inactive_page_item' : ''}
            pageInd={pageNum + 1}
            setOffset={pageNum < pages ? setOffset : () => {}}
            baseOffset={constants.PER_PAGE_RESULTS}
            textContent='Next'
          />
        )}
      </div>
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
