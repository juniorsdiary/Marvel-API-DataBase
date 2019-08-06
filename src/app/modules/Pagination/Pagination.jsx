import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PER_PAGE_RESULTS } from '../../utilities/constants';
import { definePagesIndex } from '../../utilities/lib';
import PageButton from '../PageButton/PageButton.jsx';

const Pagination = ({ requestData, searchValue, totalResult, offset, changePage }) => {
  let pages = Math.ceil(totalResult / PER_PAGE_RESULTS);

  let pageNum = offset / PER_PAGE_RESULTS + 1;

  const [firstPages, lastPages, middlePages] = definePagesIndex(pageNum, pages);
  const renderFirstPages = firstPages.map(pageInd => (
    <PageButton
      key={pageInd}
      className={pageInd === pageNum ? 'active_page_item' : ''}
      searchValue={searchValue}
      pageInd={pageInd}
      changePage={changePage}
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
      changePage={changePage}
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
      changePage={changePage}
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
            changePage={pageNum > 1 ? changePage : () => {}}
            requestData={pageNum > 1 ? requestData : () => {}}
            baseOffset={PER_PAGE_RESULTS}
            searchValue={searchValue}
            textContent='Previous'
          />
        )}
        {renderFirstPages}
        {pageNum >= 7 ? <PageButton className='inactive_page_item' textContent='...' /> : null}
        {renderMiddlePages}
        {pageNum <= pages - 6 && pages > 8 ? (
          <PageButton className='inactive_page_item' changePage={() => {}} requestData={() => {}} textContent='...' />
        ) : null}
        {pages > 4 ? renderLastPages : null}
        {pages > 1 && (
          <PageButton
            className={pageNum === pages ? 'inactive_page_item' : ''}
            pageInd={pageNum + 1}
            changePage={pageNum < pages ? changePage : () => {}}
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
  totalResult: PropTypes.number,
  offset: PropTypes.number,
  changePage: PropTypes.func,
};

const mapStateToProps = state => ({
  searchValue: state.searchValue,
  offset: state.currentOffset,
  totalResult: state.totalResult,
});

const mapDispatchToProps = dispatch => {
  return {
    changePage: offset => {
      dispatch({ type: 'CHANGE_OFFSET', payload: offset });
    },
  };
};

export default React.memo(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Pagination)
);
