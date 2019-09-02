import React from 'react';
import PropTypes from 'prop-types';
import { convertToLocale } from 'Utilities';
import { CreatorsComponent, ImageAvatar, DetailsSection, SearchCard, CharacterCard, CharactersAccordeon, EventsAccordeon } from 'Modules';

function ComicsPageContent({ data, location }) {
  const { title, description, modified, thumbnail, urls, characters, creators, events } = data;
  const src = thumbnail.path ? `${thumbnail.path}.${thumbnail.extension}` : '';
  const lastModified = convertToLocale(modified);
  return (
    <div className='items_data_wrapper'>
      <h1 className='data_title'>{title}</h1>
      <ImageAvatar WrapperComponent={'div'} className='cover_book_image' src={src} />
      <DetailsSection name={title} description={description} url={urls && urls[0].url} lastModified={lastModified} />
      <CharactersAccordeon
        MappingComponent={CharacterCard}
        number={characters.available}
        slider={true}
        contentClassName='default_slider_block'
        title={`You can meet ${characters.available} characters`}
      />
      <EventsAccordeon
        MappingComponent={SearchCard}
        number={events.available}
        slider={true}
        contentClassName='default_slider_block'
        title={`Part of ${events.available} events`}
      />
      <CreatorsComponent data={creators.items} number={creators.available} location={location} pathname={'/creators'} />
    </div>
  );
}

ComicsPageContent.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
};

export default ComicsPageContent;
