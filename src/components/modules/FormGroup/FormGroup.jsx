import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classNames';
const FormGroup = ({ requestData, children, className }) => {
  const commonClass = classNames('default_form', className);
  return (
    <form
      className={commonClass}
      onSubmit={e => {
        e.preventDefault();
        requestData(0);
      }}>
      {/* <FormGroup requestData={this.requestData} className='parametrs_list'>
        <InputElement
          id='startsWith'
          inputClass='parametrs_list__startsWith_input'
          wrapperClass='parametrs_startsWith_wrapper'
          label='name starts with'
          onChange={this.setStateValue}
          value={inputValue}
        />
        <div className='parametrs_order_wrapper'>
          <p className='parametrs_order_title'>Order:</p>
          <InputElement
        id='order_asc'
        name='name'
        inputClass='parametrs_list__order_input'
        wrapperClass='asc_order_input_wrapper'
        activeClass={order === 'name' ? 'checked' : ''}
        type='radio'
        label='A-Z'
        onChange={this.setOrderValue}
        value='name'
          />
          <InputElement
        id='order_desc'
        name='name'
        inputClass='parametrs_list__order_input'
        wrapperClass='desc_order_input_wrapper'
        activeClass={order === '-name' ? 'checked' : ''}
        type='radio'
        label='Z-A'
        onChange={this.setOrderValue}
        value='-name'
          />
        </div>
        <InputElement inputClass='submit_input' id='submit' type='submit' onSubmit={() => {}} value='Search' />
      </FormGroup> */}
    </form>
  );
};

FormGroup.propTypes = {
  requestData: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default React.memo(FormGroup);
