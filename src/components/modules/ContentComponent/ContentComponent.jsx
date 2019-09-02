import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'Modules';
import { withRouter } from 'react-router-dom';

const ContentComponent = ({ renderData, Component, setOffsetValue, totalResults, offset, location }) => {
  const renderElements = renderData.map(item => <Component key={item.id} {...item} pathname={location.pathname} />);
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
  Component: PropTypes.elementType,
  location: PropTypes.object,
  setOffsetValue: PropTypes.func,
  totalResults: PropTypes.number,
  offset: PropTypes.number,
};

export default React.memo(withRouter(ContentComponent));
