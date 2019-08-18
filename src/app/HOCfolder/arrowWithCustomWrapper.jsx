import React, { Component } from 'react';

const arrowWithCustomWrapper = () => WrappedComponent => {
  return class WrappedArrow extends Component {
    render() {
      return (
        <div tabIndex='-1' role='button' className='custom_arrow slick-arrow' onClick={this.props.onClick} onKeyUp={this.props.onClick}>
          <WrappedComponent size='25' />
        </div>
      );
    }
  };
};

export default arrowWithCustomWrapper;
