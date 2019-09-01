import React from 'react';
import PropTypes from 'prop-types';
import { InputElement, Button } from 'Modules';

const FilterComponent = ({ hiddenState, setStateValue, setHiddenState, startsWith, order, setOrderValue, handleSubmit }) => {
  return (
    <>
      <form className={`characters_filter_form ${hiddenState ? 'hidden_block' : ''}`} onSubmit={handleSubmit}>
        <InputElement
          id='startsWith'
          inputClass='parametrs_list__startsWith_input'
          wrapperClass='parametrs_startsWith_wrapper'
          label='name starts with'
          onChange={setStateValue}
          value={startsWith}
        />
        <div className='parametrs_order_wrapper'>
          <p className='parametrs_order_title'>Order:</p>
          <InputElement
            id='order_asc'
            name='order'
            inputClass='parametrs_list__order_input'
            wrapperClass='order_input_wrapper asc_order'
            activeClass={order ? 'checked' : ''}
            type='radio'
            label='A-Z'
            onChange={() => setOrderValue(true)}
          />
          <InputElement
            id='order_desc'
            name='order'
            inputClass='parametrs_list__order_input'
            wrapperClass='order_input_wrapper desc_order'
            activeClass={!order ? 'checked' : ''}
            type='radio'
            label='Z-A'
            onChange={() => setOrderValue(false)}
          />
        </div>
        <Button className='styled_btn' type='submit' onClick={handleSubmit}>
          Search
        </Button>
      </form>
    </>
  );
};

FilterComponent.propTypes = {
  hiddenState: PropTypes.bool,
  setStateValue: PropTypes.func,
  setHiddenState: PropTypes.func,
  startsWith: PropTypes.string,
  order: PropTypes.bool,
  setOrderValue: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default FilterComponent;
