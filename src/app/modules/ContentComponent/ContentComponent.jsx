import React from 'react';
import PropTypes from 'prop-types';

const ContentComponent = ({ renderData, PartialComponent, pathname }) => {
  const renderElements = renderData.map(item => <PartialComponent key={item.id} {...item} pathname={pathname} />);
  return (
    <>
      <div className='search_results_wrapper'>{renderElements}</div>
    </>
  );
};

ContentComponent.propTypes = {
  renderData: PropTypes.array,
  PartialComponent: PropTypes.any,
  pathname: PropTypes.string,
};

export default ContentComponent;
