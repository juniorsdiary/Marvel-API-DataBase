import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ImageAvatar = ({ src, className, WrapperComponent, children, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <WrapperComponent className={`${className} ${!loaded ? 'loading_image' : ''}`} {...props}>
      {children}
      <img className='block_image' src={src} alt='image_avatar' onLoad={() => setLoaded(true)} />
    </WrapperComponent>
  );
};

ImageAvatar.propTypes = {
  src: PropTypes.string,
  baseSrc: PropTypes.string,
  className: PropTypes.string,
  WrapperComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  onLoad: PropTypes.func,
  children: PropTypes.node,
};

export default React.memo(ImageAvatar);
