import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CharacterCard = ({ id, name, thumbnail }) => {
  return (
    <div className='character_card_block'>
      <Link to={`/character/${id}`}>
        <img src={`${thumbnail.path}.${thumbnail.extension}`} alt='' />
      </Link>
    </div>
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
