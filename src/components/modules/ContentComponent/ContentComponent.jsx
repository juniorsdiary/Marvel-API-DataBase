import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'Modules';

const ContentComponent = ({ renderData, Component, pathname, setOffsetValue, totalResults, offset }) => {
  const renderElements = renderData.map(item => <Component key={item.id} {...item} pathname={pathname} />);
  return (
    <>
      <div className='search_results_wrapper'>
        <Pagination setOffset={setOffsetValue} totalResults={totalResults} offset={offset} />
        {renderElements}
      </div>
    </>
  );
};

ContentComponent.propTypes = {
  renderData: PropTypes.array,
  Component: PropTypes.func,
  pathname: PropTypes.string,
  setOffsetValue: PropTypes.func,
  totalResults: PropTypes.number,
  offset: PropTypes.number,
};

export default ContentComponent;
