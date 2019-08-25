import React from 'react';
import PropTypes from 'prop-types';
import { ImageAvatar } from 'Modules';
import { Link } from 'react-router-dom';

const ComicBookPreview = ({ id, thumbnail }) => {
  const baseSrc = `${thumbnail.path}/portrait_small.${thumbnail.extension}`;
  const fullSrc = `${thumbnail.path}.${thumbnail.extension}`;
  return (
    <ImageAvatar className='cover_book_image' baseSrc={baseSrc} src={fullSrc}>
      <Link to={`/comics/${id}`} className='comic_book_link'></Link>
    </ImageAvatar>
  );
};

ComicBookPreview.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number,
  thumbnail: PropTypes.object,
};

export default ComicBookPreview;
