import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const ImageAvatar = ({ src, baseSrc, className, wrapper }) => {
  const imageRef = useRef();
  useEffect(() => {
    const fullImage = new Image();
    fullImage.src = src;
    const loadFunc = function() {
      imageRef.current.src = this.src;
    };
    const bounded = loadFunc.bind(fullImage);
    fullImage.addEventListener('load', bounded);
    return () => {
      fullImage.removeEventListener('load', bounded);
    };
  }, [src]);
  return (
    <>
      {wrapper ? (
        <div className={className}>
          <img className='character_image' src={baseSrc} alt='image_avatar' ref={imageRef} />
        </div>
      ) : (
        <img className='character_image' src={baseSrc} alt='image_avatar' ref={imageRef} />
      )}
    </>
  );
};

ImageAvatar.propTypes = {
  src: PropTypes.string,
  baseSrc: PropTypes.string,
  className: PropTypes.string,
  wrapper: PropTypes.bool,
};

export default ImageAvatar;
