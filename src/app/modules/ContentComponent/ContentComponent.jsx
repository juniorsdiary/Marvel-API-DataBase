import React from 'react';
import PropTypes from 'prop-types';

const ContentComponent = ({ renderData, PartialComponent }) => {
  const renderElements = renderData.map(item => <PartialComponent key={item.id} {...item} />);
  return <div className='search_results_wrapper'>{renderElements}</div>;
};

ContentComponent.propTypes = {
  renderData: PropTypes.array,
  PartialComponent: PropTypes.any,
};

export default ContentComponent;
