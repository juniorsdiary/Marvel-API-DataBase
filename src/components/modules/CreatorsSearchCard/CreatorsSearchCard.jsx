import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const CreatorsSearchCard = ({ id, lastName, firstName, pathname }) => {
  return (
    <Link to={`${pathname}/${id}`} className='creator_item'>
      {lastName || firstName}
    </Link>
  );
};

CreatorsSearchCard.propTypes = {
  id: PropTypes.number,
  pathname: PropTypes.string,
  lastName: PropTypes.string,
  firstName: PropTypes.string,
};

export default CreatorsSearchCard;
