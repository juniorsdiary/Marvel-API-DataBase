import React from 'react';
import PropTypes from 'prop-types';
import { SearchCard, EventsAccordeon, ComicsAccordeon, SeriesAccordeon } from 'Modules';

function ComicsPageContent({ data }) {
  const { comics, events, series, fullName } = data;
  return (
    <div className='items_data_wrapper'>
      <p className='creator_page_name'>{fullName}</p>
      <ComicsAccordeon
        MappingComponent={SearchCard}
        number={comics.available}
        contentClassName='default_slider_block'
        title={`Took part in ${comics.available} comics`}
      />
      <EventsAccordeon
        MappingComponent={SearchCard}
        number={events.available}
        contentClassName='default_slider_block'
        title={`Created ${events.available} events`}
      />
      <SeriesAccordeon
        MappingComponent={SearchCard}
        number={series.available}
        contentClassName='default_slider_block'
        title={`Creator of ${series.available} series`}
      />
    </div>
  );
}

ComicsPageContent.propTypes = {
  data: PropTypes.object,
};

export default ComicsPageContent;
