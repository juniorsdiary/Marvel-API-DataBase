import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ImageAvatar = ({ className, src, children }) => {
  const [loadingIndicator, setLoading] = useState(false);
  return (
    <div className={className}>
      {children}
      <span className={loadingIndicator ? '' : 'loading'}></span>
      <img className='character_image' src={src} alt='image_avatar' onLoad={() => setLoading(true)} />
    </div>
  );
};

ImageAvatar.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  children: PropTypes.node,
};

export default ImageAvatar;
