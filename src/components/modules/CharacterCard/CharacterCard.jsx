import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ImageAvatar } from 'Modules';

const CharacterCard = ({ id, name, thumbnail, pathname }) => {
  const { path, extension } = thumbnail;
  return (
    <ImageAvatar WrapperComponent={Link} to={`${pathname}/${id}`} className='character_link' src={`${path}.${extension}`}>
      <span className='character_link__name'>{name}</span>
    </ImageAvatar>
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

export default React.memo(CharacterCard);
