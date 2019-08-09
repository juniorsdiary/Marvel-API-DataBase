import React from 'react';
import { fetchSingleCommic } from '../../store/actions';
import classNames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImageAvatar from '../ImageAvatar/ImageAvatar.jsx';
import { Link } from 'react-router-dom';

const ComicBookPreview = ({ id, thumbnail }) => {
  const commonClass = classNames('default_comic_book_preview');
  return (
    <ImageAvatar className='comic_book_preview_image' src={`${thumbnail.path}.${thumbnail.extension}`}>
      <Link to={`/comics/${id}`} className='comic_book_link'></Link>
    </ImageAvatar>
  );
};

ComicBookPreview.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number,
  thumbnail: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    comicBookData: state.comicBookData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchComicData: id => {
      dispatch(fetchSingleCommic(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComicBookPreview);
