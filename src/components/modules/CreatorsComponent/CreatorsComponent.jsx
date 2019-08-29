import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const CreatorsComponent = ({ content, number, location, pathname }) => {
  const search = location.pathname
    .split('/')
    .join('=')
    .replace(/=/, '?');
  return (
    <div className='creators_content_block'>
      <p className='creators_content_title'>{`${number} creators`}</p>
      {content}
      {number > 15 && (
        <Link to={{ pathname, search }} className='show_more_link'>
          Show More
        </Link>
      )}
    </div>
  );
};
CreatorsComponent.propTypes = {
  number: PropTypes.number,
  content: PropTypes.array,
  location: PropTypes.object,
  pathname: PropTypes.string,
};
export default CreatorsComponent;
