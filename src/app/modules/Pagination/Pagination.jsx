import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PER_PAGE_RESULTS } from '../../constants';
import { definePagesIndex } from '../../lib';
import PageButton from '../PageButton/PageButton.jsx';

const Pagination = ({ requestData, searchValue, paginationData }) => {
  const { totalResult, offset } = paginationData;

  let pages = Math.ceil(totalResult / PER_PAGE_RESULTS);

  let pageNum = offset / PER_PAGE_RESULTS + 1;

  const [firstPages, lastPages, middlePages] = definePagesIndex(pageNum, pages);

  const renderFirstPages = firstPages.map(pageInd => (
    <PageButton
      key={pageInd}
      className={pageInd === pageNum ? 'active_page_item' : ''}
      searchValue={searchValue}
      pageInd={pageInd}
      requestData={requestData}
      baseOffset={PER_PAGE_RESULTS}
    />
  ));

  const renderLastPages = lastPages.map(pageInd => (
    <PageButton
      key={pageInd}
      className={pageInd === pageNum ? 'active_page_item' : ''}
      searchValue={searchValue}
      pageInd={pageInd}
      requestData={requestData}
      baseOffset={PER_PAGE_RESULTS}
    />
  ));

  const renderMiddlePages = middlePages.map(pageInd => (
    <PageButton
      key={pageInd}
      className={pageInd === pageNum ? 'active_page_item' : ''}
      searchValue={searchValue}
      pageInd={pageInd}
      requestData={requestData}
      baseOffset={PER_PAGE_RESULTS}
    />
  ));

  return (
    <div className='pagination'>
      <p className='total_results'>Total results: {totalResult}</p>
      <div className='toogle_pages_block'>
        {pages > 1 && (
          <PageButton
            className={pageNum === 1 ? 'inactive_page_item' : ''}
            pageInd={pageNum - 1}
            requestData={pageNum > 1 ? requestData : () => {}}
            baseOffset={PER_PAGE_RESULTS}
            searchValue={searchValue}
            textContent='Previous'
          />
        )}
        {renderFirstPages}
        {pageNum >= 7 ? <PageButton className='inactive_page_item' requestData={null} textContent='...' /> : null}
        {renderMiddlePages}
        {pageNum <= pages - 6 && pages > 8 ? <PageButton className='inactive_page_item' requestData={null} textContent='...' /> : null}
        {pages > 4 ? renderLastPages : null}
        {pages > 1 && (
          <PageButton
            className={pageNum === pages ? 'inactive_page_item' : ''}
            pageInd={pageNum + 1}
            requestData={pageNum < pages ? requestData : () => {}}
            baseOffset={PER_PAGE_RESULTS}
            searchValue={searchValue}
            textContent='Next'
          />
        )}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  requestData: PropTypes.func,
  searchValue: PropTypes.string,
  paginationData: PropTypes.object,
};

const mapStateToProps = state => ({
  searchValue: state.searchValue,
  paginationData: state.paginationData,
});

export default React.memo(connect(mapStateToProps)(Pagination));
