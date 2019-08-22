import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ImageAvatar from 'Modules/ImageAvatar/ImageAvatar.jsx';

const CharacterCard = ({ id, name, thumbnail }) => {
  const { path, extension } = thumbnail;
  return (
    <Link to={`/characters/${id}`} className='character_link'>
      <span className='character_link__link_name'>{name}</span>
      <ImageAvatar className='character_link__link_image' baseSrc={`${path}/standard_small.${extension}`} src={`${path}.${extension}`} />
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
};

export default CharacterCard;
