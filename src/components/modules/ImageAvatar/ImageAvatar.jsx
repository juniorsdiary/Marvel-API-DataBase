import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ImageAvatar = ({ src, onLoad, className, wrapper }) => {
  const imageRef = useRef();

  useEffect(() => {
    const fullImage = new Image();
    fullImage.src = src;
    const loadFunc = function() {
      imageRef.current.src = this.src;
      onLoad(true);
    };
    const bounded = loadFunc.bind(fullImage);
    fullImage.addEventListener('load', bounded);
    return () => {
      fullImage.removeEventListener('load', bounded);
    };
  }, [onLoad, src]);
  return (
    <>
      {wrapper ? (
        <div className={className}>
          <img className='block_image' alt='image_avatar' ref={imageRef} />
        </div>
      ) : (
        <img className='block_image' alt='image_avatar' ref={imageRef} />
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
