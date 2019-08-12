import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const ImageAvatar = ({ className, src, children, baseSrc }) => {
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
    <div className={className}>
      {children}
      <img className='character_image' src={baseSrc} alt='image_avatar' ref={imageRef} />
    </div>
  );
};

ImageAvatar.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  children: PropTypes.node,
  baseSrc: PropTypes.string,
};

export default ImageAvatar;
