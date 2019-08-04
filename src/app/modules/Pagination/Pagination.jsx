import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { PER_PAGE_RESULTS } from '../../constants';
import PageButton from '../PageButton/PageButton.jsx';

const Pagination = ({ requestData }) => {
  const { totalResult, offset } = useSelector(state => state.paginationData);
  const searchValue = useSelector(state => state.searchValue);
  let pages = Math.ceil(totalResult / PER_PAGE_RESULTS);
  let pageNum = offset === 0 ? 1 : offset / PER_PAGE_RESULTS;

  let firstPages = pages > 1 ? [1, 2] : [];
  let lastPages = pages >= 5 ? [pages - 1, pages] : [];
  let middlePages = [];

  for (let pageInd = 3; pageInd <= (pages < 5 ? pages : pages - 2); pageInd++) {
    if (pages < 9) {
      middlePages.push(pageInd);
    } else if ((pageNum < 4 && pageInd <= 5) || (pageNum >= pages - 5 && pageInd >= pages - 4)) {
      middlePages.push(pageInd);
    } else if (pageNum <= 6 && pageInd <= pageNum + 2) {
      middlePages.push(pageInd);
    } else if (pageNum > 6 && pageInd <= pageNum + 2 && pageInd >= pageNum - 2) {
      middlePages.push(pageInd);
    }
  }

  const renderFirstPages = firstPages.map(pageInd => (
    <PageButton key={pageInd} searchValue={searchValue} pageInd={pageInd} pageNum={pageNum} baseOffset={PER_PAGE_RESULTS} requestData={requestData} />
  ));

  const renderLastPages = lastPages.map(pageInd => (
    <PageButton key={pageInd} searchValue={searchValue} pageInd={pageInd} pageNum={pageNum} baseOffset={PER_PAGE_RESULTS} requestData={requestData} />
  ));

  const renderMiddlePages = middlePages.map(pageInd => (
    <PageButton key={pageInd} searchValue={searchValue} pageInd={pageInd} pageNum={pageNum} baseOffset={PER_PAGE_RESULTS} requestData={requestData} />
  ));

  return (
    <div className='pagination'>
      <p className='total_results'>Total results: {totalResult}</p>
      <div className='toogle_pages_block'>
        <div className='pagination_block'>
          <span
            role='button'
            className={pageNum === 1 ? 'pagination_block__page_item inactive_page_item' : 'pagination_block__page_item'}
            onClick={pageNum > 1 ? () => requestData(searchValue, pageNum - 1) : null}>
            Previous
          </span>
          {renderFirstPages}
          {pageNum >= 7 ? <span className='pagination_block__gap_item inactive_page_item'>...</span> : null}
          {renderMiddlePages}
          {pageNum <= pages - 6 && pages > 8 ? <span className='pagination_block__gap_item inactive_page_item'>...</span> : null}
          {pages > 4 ? renderLastPages : null}
          <span
            role='button'
            className={pageNum === 100 ? 'pagination_block__page_item inactive_page_item' : 'pagination_block__page_item'}
            onClick={pageNum < 100 ? () => requestData(searchValue, pageNum + 1) : null}>
            Next
          </span>
        </div>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  requestData: PropTypes.func,
};

export default React.memo(Pagination);
