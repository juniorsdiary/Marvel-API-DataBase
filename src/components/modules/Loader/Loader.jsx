import React from 'react';

const Loader = () => (
  <div className='fetching_block'>
    <span className='first_circle'></span>
    <span className='second_circle'></span>
    <span className='third_circle'></span>
    <span className='fourth_circle'></span>
    <span className='loader_center'></span>
  </div>
);

export default Loader;
