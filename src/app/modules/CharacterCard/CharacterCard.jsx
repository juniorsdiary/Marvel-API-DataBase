import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ImageAvatar from '../../modules/ImageAvatar/ImageAvatar.jsx';

const CharacterCard = ({ id, name, thumbnail }) => {
  const { path, extension } = thumbnail;
  return (
    <ImageAvatar className='character_card_block' baseSrc={`${path}/standard_small.${extension}`} src={`${path}.${extension}`}>
      <Link to={`/characters/${id}`} className='character_link'>
        {name}
      </Link>
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
};

export default CharacterCard;
