import React from 'react';
import PropTypes from 'prop-types';

const ContentComponent = ({ renderData, Component, pathname }) => {
  const renderElements = renderData.map(item => <Component key={item.id} {...item} pathname={pathname} />);
  return (
    <>
      <div className='search_results_wrapper'>{renderElements}</div>
    </>
  );
};

ContentComponent.propTypes = {
  renderData: PropTypes.array,
  Component: PropTypes.any,
  pathname: PropTypes.string,
};

export default ContentComponent;
