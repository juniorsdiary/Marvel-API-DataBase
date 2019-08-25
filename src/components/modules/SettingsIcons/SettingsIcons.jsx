import React from 'react';
import PropTypes from 'prop-types';
import { IoIosFunnel, IoIosList, IoMdApps } from 'react-icons/io';

const SettingsIcons = ({ showFilterBlock, componentType, changeComponentType }) => (
  <div className='settings_icons_block'>
    <IoIosFunnel size='25' onClick={() => showFilterBlock(false)} className='filter_icon' />
    <IoIosList
      size='25'
      className={`toggle_component_list ${componentType === 'list' ? 'active_component_type' : ''}`}
      onClick={() => changeComponentType('list')}
    />
    <IoMdApps
      size='25'
      className={`toggle_component_cards ${componentType === 'cards' ? 'active_component_type' : ''}`}
      onClick={() => changeComponentType('cards')}
    />
  </div>
);

SettingsIcons.propTypes = {
  showFilterBlock: PropTypes.func,
  componentType: PropTypes.string,
  changeComponentType: PropTypes.func,
};

export default SettingsIcons;
