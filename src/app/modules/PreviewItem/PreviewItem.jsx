import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PreviewItem = ({ name, resourceURI, role, pathname }) => {
  const id = resourceURI.split('/').slice(-1)[0];
  return (
    <Link to={`/creators/${id}`} className='creator_name'>
      <span>{name}</span>
      <span>{role}</span>
    </Link>
  );
};

PreviewItem.propTypes = {
  name: PropTypes.string,
  resourceURI: PropTypes.string,
  role: PropTypes.string,
  pathname: PropTypes.string,
};

export default PreviewItem;
