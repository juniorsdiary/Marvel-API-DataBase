import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CharacterCard = ({ id, name, thumbnail }) => {
  const [loadingIndicator, setLoading] = useState(false);
  return (
    <div className='character_card_block'>
      <Link to={`/character/${id}`} className='character_link'>
        {name}
      </Link>
      <span className={loadingIndicator ? '' : 'loading'}></span>
      <img className='character_image' src={`${thumbnail.path}.${thumbnail.extension}`} alt='' onLoad={() => setLoading(true)} />
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
  imageLoaded: PropTypes.bool,
};

export default CharacterCard;
