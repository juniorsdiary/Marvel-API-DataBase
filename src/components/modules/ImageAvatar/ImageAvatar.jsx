import React from 'react';
import PropTypes from 'prop-types';

const ImageAvatar = ({ src, onLoad, className, wrapper }) => {
  return (
    <>
      {wrapper ? (
        <div className={className}>
          <img className='block_image' src={src} alt='image_avatar' onLoad={() => onLoad(true)} />
        </div>
      ) : (
        <img className='block_image' src={src} alt='image_avatar' onLoad={() => onLoad(true)} />
      )}
    </>
  );
};

ImageAvatar.propTypes = {
  src: PropTypes.string,
  baseSrc: PropTypes.string,
  className: PropTypes.string,
  wrapper: PropTypes.bool,
  onLoad: PropTypes.func,
};

export default ImageAvatar;
