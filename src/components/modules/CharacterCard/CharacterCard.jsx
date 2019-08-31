import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ImageAvatar } from 'Modules';

const CharacterCard = ({ id, name, thumbnail, pathname }) => {
  const { path, extension } = thumbnail;
  const [loaded, setLoaded] = useState(false);
  return (
    <Link to={`${pathname}/${id}`} className={`character_link ${!loaded ? 'loading_image' : ''}`}>
      <span className='character_link__name'>{name}</span>
      <ImageAvatar onLoad={setLoaded} src={`${path}.${extension}`} />
    </Link>
  );
};

CharacterCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  thumbnail: PropTypes.shape({
    path: PropTypes.string,
    extension: PropTypes.string,
  }),
  pathname: PropTypes.string,
};

export default CharacterCard;
