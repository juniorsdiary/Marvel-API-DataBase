import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ImageAvatar from '../../modules/ImageAvatar/ImageAvatar.jsx';

const CharacterCard = ({ id, name, thumbnail }) => {
  return (
    <ImageAvatar className='character_card_block' src={`${thumbnail.path}.${thumbnail.extension}`}>
      <Link to={`/character/${id}`} className='character_link'>
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
