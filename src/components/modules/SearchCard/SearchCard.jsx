import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ImageAvatar } from 'Modules';

const SearchCard = ({ id, title, thumbnail, pathname }) => {
  const { path, extension } = thumbnail;
  return <ImageAvatar to={`${pathname}/${id}`} WrapperComponent={Link} className='search_link' src={`${path}.${extension}`} />;
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

export default React.memo(SearchCard);
