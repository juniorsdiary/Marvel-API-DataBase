import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ImageAvatar } from 'Modules';

const SearchCard = ({ id, title, thumbnail, pathname }) => {
  const { path, extension } = thumbnail;
  const [loaded, setLoaded] = useState(false);
  return (
    <Link to={`${pathname}/${id}`} className={`search_link ${!loaded ? 'loading_image' : ''}`}>
      <ImageAvatar onLoad={setLoaded} src={`${path}.${extension}`} />
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
  pathname: PropTypes.string,
};

export default SearchCard;
