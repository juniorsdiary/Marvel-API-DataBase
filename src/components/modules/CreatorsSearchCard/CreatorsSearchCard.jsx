import React from 'react';
import { Link } from 'react-router-dom';
const CreatorsSearchCard = ({ id, fullName, pathname }) => {
  // console.log(props);
  return (
    <Link to={`${pathname}/${id}`} className='creator_item'>
      {fullName}
    </Link>
  );
};

export default CreatorsSearchCard;
