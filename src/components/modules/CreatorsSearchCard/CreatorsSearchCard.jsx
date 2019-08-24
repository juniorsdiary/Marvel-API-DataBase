import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const CreatorsSearchCard = ({ id, fullName, pathname }) => {
  return (
    <Link to={`${pathname}/${id}`} className='creator_item'>
      {fullName}
    </Link>
  );
};

CreatorsSearchCard.propTypes = {
  id: PropTypes.number,
  fullName: PropTypes.string,
  pathname: PropTypes.string,
};

export default CreatorsSearchCard;
