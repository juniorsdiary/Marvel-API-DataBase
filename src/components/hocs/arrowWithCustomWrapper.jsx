import React, { Component } from 'react';
import PropTypes from 'prop-types';

const arrowWithCustomWrapper = () => DefaultArrow => {
  class WrappedArrow extends Component {
    render() {
      return (
        <div tabIndex='-1' role='button' className='custom_arrow slick-arrow' onClick={this.props.onClick} onKeyUp={this.props.onClick}>
          <DefaultArrow size='25' />
        </div>
      );
    }
  }
  WrappedArrow.propTypes = {
    onClick: PropTypes.func,
  };
  return WrappedArrow;
};

export default arrowWithCustomWrapper;
