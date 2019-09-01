import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const AdjacentItemLink = ({ data, title }) => {
  const link = data.resourceURI.match(/\w+\/\d+/)[0];
  return (
    <div className='adjasent_item_link_block'>
      <span>{title}</span>
      <Link to={`/${link}`} className='adjasent_item_link styled_btn'>
        {data.name}
      </Link>
    </div>
  );
};

AdjacentItemLink.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
};

export default AdjacentItemLink;
