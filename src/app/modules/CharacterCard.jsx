import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CharacterCard = ({ id, name, thumbnail }) => {
  return (
    <div>
      <img src={`${thumbnail.path}.${thumbnail.extension}`} width='150' height='150' alt='' />
      <p>{name}</p>
      <Link to={`/character/${id}`}>Show More</Link>
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
