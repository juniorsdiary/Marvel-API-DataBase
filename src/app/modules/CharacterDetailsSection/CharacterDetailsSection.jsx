import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const CharacterDetailsSection = ({ name, description, url, lastModified }) => (
  <div className='character_data_details'>
    <h1 className='character_data_title'>{name}</h1>
    <p className='character_data_description'>{description ? description : `We are sorry! :( We couldn't find any description`}</p>
    <p className='character_data_details_link'>
      Want to know more details about this character? Visit official Marvel{' '}
      <a href={url} target='blank'>
        web-site
      </a>
    </p>
    <p className='character_data_last_modified'>Last modified: {lastModified}</p>
  </div>
);

export default CharacterDetailsSection;
