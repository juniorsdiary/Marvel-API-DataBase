import React from 'react';
import PropTypes from 'prop-types';

const PreviewItem = props => {
  // console.log(props);
  return (
    <div>
      <h1>Name</h1>
    </div>
  );
};

PreviewItem.propTypes = {
  data: PropTypes.object,
};

export default PreviewItem;
