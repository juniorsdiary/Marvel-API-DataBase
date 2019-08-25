import React from 'react';
import PropTypes from 'prop-types';
import { InputElement, Button } from 'Modules';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import classNames from 'classNames';

const FilterComponent = ({ className, setStateValue, setHiddenState, startsWith, order, setOrderValue, handleSubmit }) => {
  const commonClass = classNames('default_form', className);
  return (
    <>
      <form className={commonClass} onSubmit={handleSubmit}>
        <IoIosCloseCircleOutline size='25' onClick={() => setHiddenState(true)} className='close_icon' />
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
            wrapperClass='asc_order_input_wrapper'
            activeClass={order ? 'checked' : ''}
            type='radio'
            label='A-Z'
            onChange={() => setOrderValue(true)}
          />
          <InputElement
            id='order_desc'
            name='order'
            inputClass='parametrs_list__order_input'
            wrapperClass='desc_order_input_wrapper'
            activeClass={!order ? 'checked' : ''}
            type='radio'
            label='Z-A'
            onChange={() => setOrderValue(false)}
          />
        </div>
        <Button className='search_btn' type='submit' onClick={handleSubmit}>
          Search
        </Button>
      </form>
    </>
  );
};

FilterComponent.propTypes = {
  className: PropTypes.string,
  setStateValue: PropTypes.func,
  setHiddenState: PropTypes.func,
  startsWith: PropTypes.string,
  order: PropTypes.bool,
  setOrderValue: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default FilterComponent;
