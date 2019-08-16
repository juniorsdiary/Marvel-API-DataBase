import React from 'react';
import PropTypes from 'prop-types';
import { PER_PAGE_RESULTS } from '../../utilities/constants';
import { definePagesIndex } from '../../utilities/lib';
import PageButton from '../PageButton/PageButton.jsx';

const Pagination = ({ requestData, totalResults, offset, searchValue }) => {
  let pages = Math.ceil(totalResults / PER_PAGE_RESULTS);
  let pageNum = offset / PER_PAGE_RESULTS + 1;
  const [firstPages, lastPages, middlePages] = definePagesIndex(pageNum, pages);

  const renderFirstPages = firstPages.map(pageInd => (
    <PageButton
      key={pageInd}
      searchValue={searchValue}
      className={pageInd === pageNum ? 'active_page_item' : ''}
      pageInd={pageInd}
      requestData={requestData}
      baseOffset={PER_PAGE_RESULTS}
    />
  ));

  const renderLastPages = lastPages.map(pageInd => (
    <PageButton
      key={pageInd}
      searchValue={searchValue}
      className={pageInd === pageNum ? 'active_page_item' : ''}
      pageInd={pageInd}
      requestData={requestData}
      baseOffset={PER_PAGE_RESULTS}
    />
  ));

  const renderMiddlePages = middlePages.map(pageInd => (
    <PageButton
      key={pageInd}
      searchValue={searchValue}
      className={pageInd === pageNum ? 'active_page_item' : ''}
      pageInd={pageInd}
      requestData={requestData}
      baseOffset={PER_PAGE_RESULTS}
    />
  ));
  return (
    <div className='pagination'>
      <p className='total_results'>Total results: {totalResults}</p>
      <div className='toogle_pages_block'>
        {pages > 1 && (
          <PageButton
            className={pageNum === 1 ? 'inactive_page_item' : ''}
            searchValue={searchValue}
            pageInd={pageNum - 1}
            requestData={pageNum > 1 ? requestData : () => {}}
            baseOffset={PER_PAGE_RESULTS}
            textContent='Previous'
          />
        )}
        {renderFirstPages}
        {pageNum >= 7 ? <PageButton className='inactive_page_item' textContent='...' /> : null}
        {renderMiddlePages}
        {pageNum <= pages - 6 && pages > 8 ? <PageButton className='inactive_page_item' requestData={() => {}} textContent='...' /> : null}
        {pages > 4 ? renderLastPages : null}
        {pages > 1 && (
          <PageButton
            className={pageNum === pages ? 'inactive_page_item' : ''}
            searchValue={searchValue}
            pageInd={pageNum + 1}
            requestData={pageNum < pages ? requestData : () => {}}
            baseOffset={PER_PAGE_RESULTS}
            textContent='Next'
          />
        )}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  requestData: PropTypes.func,
  changePage: PropTypes.func,
  totalResults: PropTypes.number,
  offset: PropTypes.number,
};

Pagination.defaultProps = {
  requestData: () => {},
  totalResults: 0,
  offset: 0,
  changePage: () => {},
};

export default React.memo(Pagination);
