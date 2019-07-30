import React from 'react';
import { connect, useSelector } from 'react-redux';

const Counter = () => {
  const count = useSelector(state => state.counter);
  return <div>{count}</div>;
};

export default connect()(Counter);
