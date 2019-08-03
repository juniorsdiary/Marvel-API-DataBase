import React from 'react';
import InputElement from '../InputElement/InputElement.jsx';
import { useFormSearch } from '../../customHooks';
import PropTypes from 'prop-types';

const ParametrsComponent = ({ submitValue }) => {
  const [startsWith, setStateValue] = useFormSearch('');
  return (
    <form
      className='parametrs_list'
      onSubmit={e => {
        e.preventDefault();
        setStateValue('');
        submitValue(startsWith);
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
  submitValue: PropTypes.func,
};

export default React.memo(ParametrsComponent);
