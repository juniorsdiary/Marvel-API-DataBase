import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ImageAvatar from '../../modules/ImageAvatar/ImageAvatar.jsx';

const SearchCard = ({ id, title, thumbnail, pathname }) => {
  const { path, extension } = thumbnail;
  return (
    <Link to={`${pathname}/${id}`} className='search_link'>
      <ImageAvatar baseSrc={`${path}/portrait_small.${extension}`} src={`${path}.${extension}`} />
    </Link>
  );
};

SearchCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  thumbnail: PropTypes.shape({
    path: PropTypes.string,
    extension: PropTypes.string,
  }),
};

export default SearchCard;
