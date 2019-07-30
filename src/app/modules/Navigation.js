import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <div>
    <Link to='/characters'>Characters</Link>
    <Link to='/comics'>Comics</Link>
  </div>
);

export default Navigation;
