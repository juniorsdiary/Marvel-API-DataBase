import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ImageAvatar from '../../modules/ImageAvatar/ImageAvatar.jsx';

const ComicBookSearchCard = ({ id, title, thumbnail }) => {
  const { path, extension } = thumbnail;
  return (
    <ImageAvatar className='comic_book_card_block' baseSrc={`${path}/portrait_small.${extension}`} src={`${path}.${extension}`}>
      <Link to={`/comics/${id}`} className='comic_book_link'>
        {title}
      </Link>
    </ImageAvatar>
  );
};

ComicBookSearchCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  thumbnail: PropTypes.shape({
    path: PropTypes.string,
    extension: PropTypes.string,
  }),
};

export default ComicBookSearchCard;
