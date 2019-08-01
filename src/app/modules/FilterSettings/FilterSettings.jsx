import React, { useState } from 'react';
import SearchComponent from '../SearchComponent/SearchComponent.jsx';
import ParametrsComponent from '../ParametrsComponent/ParametrsComponent.jsx';

const basicClasses = {
  wrapper: 'simple_parametrs_block',
  title: 'simple_parametrs__title',
};
const advancedClasses = {
  wrapper: 'advanced_parametrs_block',
  title: 'advanced_parametrs__title',
};

const FilterSettings = () => {
  const [{ search1, search2 }, toogleParametrs] = useState({ search1: true, search2: false });
  return (
    <div className='filter_parametrs_block'>
      <SearchComponent
        toogleAppearence={() => toogleParametrs(state => ({ search1: true, search2: false }))}
        titleText={'Basic search'}
        classNames={basicClasses}
        active={search1}>
        <ParametrsComponent active={!search1} />
      </SearchComponent>
      <SearchComponent
        toogleAppearence={() => toogleParametrs(state => ({ search1: false, search2: true }))}
        titleText={'Advanced search'}
        classNames={advancedClasses}
        active={search2}>
        <ParametrsComponent active={!search2} />
      </SearchComponent>
    </div>
  );
};

export default FilterSettings;
