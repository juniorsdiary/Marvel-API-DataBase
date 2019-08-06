import React from 'react';
import InputElement from '../InputElement/InputElement.jsx';
import { useFormSearch } from '../../utilities/customHooks';
import PropTypes from 'prop-types';

const ParametrsComponent = ({ requestData }) => {
  const [startsWith, setStateValue] = useFormSearch('');
  return (
    <form
      className='parametrs_list'
      onSubmit={e => {
        e.preventDefault();
        setStateValue('');
        requestData(startsWith, 0);
      }}>
      <InputElement
        id='startsWith'
        className='parametrs_list__startsWith_input'
        type='text'
        label='starts with'
        onChange={e => setStateValue(e.target.value)}
        value={startsWith}
      />
    </form>
  );
};

ParametrsComponent.propTypes = {
  requestData: PropTypes.func,
};

export default React.memo(ParametrsComponent);
