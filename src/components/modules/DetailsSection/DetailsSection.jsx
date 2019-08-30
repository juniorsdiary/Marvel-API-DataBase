import React from 'react';
import PropTypes from 'prop-types';

const CharacterDetailsSection = ({ description, url, lastModified }) => (
  <div className='data_details'>
    <p className='data_description'>{description ? description : `We are sorry! :( We couldn't find any description`}</p>
    <p className='data_details_link'>
      Want to know more details about this item? Visit official Marvel{' '}
      <a href={url} target='blank'>
        web-site
      </a>
    </p>
    <p className='data_last_modified'>Last modified: {lastModified}</p>
  </div>
);

CharacterDetailsSection.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  lastModified: PropTypes.string,
};

export default CharacterDetailsSection;
