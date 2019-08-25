import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ListItem = ({ id, title, name = title, pathname }) => (
  <Link to={`${pathname}/${id}`} className='results_list_item'>
    <span className=''>{name}</span>
  </Link>
);
ListItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  name: PropTypes.string,
  pathname: PropTypes.string,
};
export default ListItem;
