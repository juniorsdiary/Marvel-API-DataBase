import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PreviewItem = ({ id, fullName }) => {
  return (
    <Link to={`/creators/${id}`} className='creator_name'>
      {fullName}
    </Link>
  );
};

PreviewItem.propTypes = {
  id: PropTypes.number,
  fullName: PropTypes.string,
};

export default PreviewItem;
