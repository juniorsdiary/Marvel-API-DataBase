import React from 'react';
import { IoIosRefresh } from 'react-icons/io';
import PropTypes from 'prop-types';

const Reload = ({ loadData, size }) => <IoIosRefresh size={size} onClick={() => loadData()} />;

Reload.propTypes = {
  loadData: PropTypes.func,
  size: PropTypes.string,
};
export default Reload;
