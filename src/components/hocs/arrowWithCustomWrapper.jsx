import React, { Component } from 'react';
/* eslint-disable react/prop-types */
const arrowWithCustomWrapper = () => DefaultArrow => {
  return class WrappedArrow extends Component {
    render() {
      return (
        <div tabIndex='-1' role='button' className='custom_arrow slick-arrow' onClick={this.props.onClick} onKeyUp={this.props.onClick}>
          <DefaultArrow size='25' />
        </div>
      );
    }
  };
};
/* eslint-enable react/prop-types */
export default arrowWithCustomWrapper;
