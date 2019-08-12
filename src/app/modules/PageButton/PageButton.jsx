import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

const PageButton = ({ className, pageInd, requestData, baseOffset, textContent, isFetching }) => {
  const commonClass = classNames('pagination_block__page_item', className);
  return (
    <span
      className={commonClass}
      role='button'
      onClick={() => {
        requestData((pageInd - 1) * baseOffset);
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
  textContent: PropTypes.any,
  isFetching: PropTypes.bool,
};
const mapStateToProps = state => {
  return {
    isFetching: state.isFetching,
  };
};
export default connect(mapStateToProps)(PageButton);
