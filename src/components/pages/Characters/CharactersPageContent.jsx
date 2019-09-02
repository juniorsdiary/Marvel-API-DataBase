import React from 'react';
import PropTypes from 'prop-types';
import { convertToLocale } from 'Utilities';
import { ImageAvatar, DetailsSection, SearchCard, EventsAccordeon, ComicsAccordeon, SeriesAccordeon } from 'Modules';

function CharactersPageContent({ data }) {
  const { name, description, modified, thumbnail, urls, comics, series, events } = data;
  const src = thumbnail.path ? `${thumbnail.path}.${thumbnail.extension}` : '';
  const lastModified = convertToLocale(modified);
  return (
    <div className='items_data_wrapper'>
      <h1 className='data_title'>{name}</h1>
      <ImageAvatar WrapperComponent={'div'} className='character_page_image' src={src} />
      <DetailsSection name={name} description={description} url={urls && urls[0].url} lastModified={lastModified} />
      <ComicsAccordeon
        MappingComponent={SearchCard}
        number={comics.available}
        slider={true}
        contentClassName='default_slider_block'
        title={`Encountered in ${comics.available} comics`}
      />
      <SeriesAccordeon
        MappingComponent={SearchCard}
        number={series.available}
        slider={true}
        contentClassName='default_slider_block'
        title={`Encountered in ${series.available} series`}
      />
      <EventsAccordeon
        MappingComponent={SearchCard}
        number={events.available}
        slider={true}
        contentClassName='default_slider_block'
        title={`Encountered in ${events.available} events`}
      />
    </div>
  );
}

CharactersPageContent.propTypes = {
  data: PropTypes.object,
};

export default CharactersPageContent;
