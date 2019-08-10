import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

const ImageAvatar = ({ className, src, children, baseSrc }) => {
  const imageRef = useRef();
  const fullImage = new Image();
  fullImage.src = src;
  fullImage.onload = function() {
    imageRef.current.src = this.src;
  };
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
};

export default ImageAvatar;
