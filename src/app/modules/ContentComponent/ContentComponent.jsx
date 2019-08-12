import React from 'react';
import PropTypes from 'prop-types';

const ContentComponent = ({ className, renderData, PartialComponent }) => {
  const renderElements = renderData.map(item => <PartialComponent key={item.id} {...item} />);
  return <div className={className}>{renderElements}</div>;
};

ContentComponent.propTypes = {
  className: PropTypes.string,
  renderData: PropTypes.array,
  PartialComponent: PropTypes.any,
};

export default ContentComponent;
