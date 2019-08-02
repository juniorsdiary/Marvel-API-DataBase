import React from 'react';
import InputElement from '../InputElement/InputElement.jsx';
import { useFormSearch } from '../../customHooks';

const ParametrsComponent = () => {
  const [startsWith, setStateValue] = useFormSearch('');
  return (
    <form className='parametrs_list'>
      <InputElement
        id='startsWith'
        className='parametrs_list__startsWith_input'
        type='text'
        label='starts with'
        onChange={setStateValue}
        value={startsWith}
      />
    </form>
  );
};
export default ParametrsComponent;
